import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

const SeeAllScreen = (props) => {
  let movies;
  let goToMovies = props.route.params.new_releases;
  let goToTV = props.route.params.new_tv_shows;
  let goToAnime = props.route.params.goToAnime;
  let movieType;

  if (goToMovies) {
    movies = useSelector((state) => state.Movies.new_releases);
    movieType = "Movies";
  } else if (goToTV) {
    movies = useSelector((state) => state.Movies.new_tv_shows);
    movieType = "TV";
  } else if (goToAnime) {
    movies = useSelector((state) => state.Movies.anime);
    movieType = "anime";
  }
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={movies}
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
                  moviesType: movieType,
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
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.headerTitle;
  return {
    headerTitle: headerTitle,
  };
};

export default SeeAllScreen;
