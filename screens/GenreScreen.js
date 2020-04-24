import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";

import MovieItem from "../components/MovieItem";

const GenreScreen = (props) => {
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{
          //   alignItems: "center",
          justifyContent: "space-between",
        }}
        numColumns={2}
        data={moviesWRTGenre}
        renderItem={(itemData) => (
          <MovieItem
            style={{ width: 175, height: 175 }}
            id={itemData.item.id}
            movieTitle={itemData.item.title}
            posterUrl={itemData.item.posterUrl}
            year={itemData.item.year}
            ratings={itemData.item.ratings}
            onPress={() => {
              props.navigation.navigate({
                name: "MoviesWRTGenreDetailScreen",
                params: {
                  movieTitle: itemData.item.title,
                  posterUrl: itemData.item.posterUrl,
                  movieId: itemData.item.id,
                  //   itemData: itemData,
                },
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.GenreName;
  return {
    headerTitle: headerTitle,
  };
};

export default GenreScreen;
