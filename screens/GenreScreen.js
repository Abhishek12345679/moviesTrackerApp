import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

const selectNumOfDoneTodos = createSelector(
  (state) => state.Movies.moviesWRTGenre,
  (moviesWRTGenre) => moviesWRTGenre
);

const GenreScreen = (props) => {
  const moviesWRTGenre = useSelector(selectNumOfDoneTodos);

  const renderItem = ({ item }) => (
    <MovieItem
      style={{ width: 175, height: 175 }}
      id={item.id}
      movieTitle={item.title}
      posterUrl={item.posterUrl}
      year={item.year}
      ratings={item.ratings}
      onPress={() => {
        props.navigation.navigate({
          name: "MoviesWRTGenreDetailScreen",
          params: {
            movieTitle: item.title,
            posterUrl: item.posterUrl,
            movieId: item.id,
          },
        });
      }}
    />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        // initialNumToRender={1}
        // maxToRenderPerBatch={6}
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={moviesWRTGenre}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.GenreName;
  return {
    headerTitle: headerTitle,
  };
};

export default GenreScreen;
