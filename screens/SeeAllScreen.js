import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";

import MovieItem from "../components/MovieItem";

const SeeAllScreen = (props) => {
  const trendingMovies = useSelector((state) => state.Movies.new_releases);
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{
          //   alignItems: "center",
          justifyContent: "space-between",
        }}
        numColumns={2}
        data={trendingMovies}
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
                name: "MoviesDetailScreen",
                params: {
                  movieId: itemData.item.id,
                  movieTitle: itemData.item.title,
                  new_releases: true,
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
  const headerTitle = "Trending";
  return {
    headerTitle: headerTitle,
  };
};

export default SeeAllScreen;
