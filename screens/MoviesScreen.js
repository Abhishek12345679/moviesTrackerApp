import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import MovieItem from "../components/MovieItem";
import { FlatList } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";

import * as MoviesAction from "../store/actions/MoviesAction";

const MoviesScreen = (props) => {
  const movies = useSelector((state) => state.Movies.movies);
  console.log(movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesAction.loadMovies());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <FlatList
        horizontal={true}
        data={movies}
        renderItem={(itemData) => (
          <MovieItem
            id={itemData.item.id}
            movieTitle={itemData.item.title}
            posterUrl={itemData.item.posterUrl}
            year={itemData.item.year}
            onPress={() => {
              props.navigation.navigate("MoviesDetailsScreen");
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MoviesScreen;
