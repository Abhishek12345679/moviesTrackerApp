import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

import * as MovieAction from "../store/actions/MoviesAction";

import { useIsFocused } from "@react-navigation/native";

// This hook returns `true` if the screen is focused, `false` otherwise

const GenreScreen = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // if (!isFocused) {
  //   dispatch(MovieAction.clearGenreScreen());
  // }
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.flatlist}
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
  const headerTitle = navData.route.params.name;
  return {
    headerTitle: headerTitle,
  };
};

export default GenreScreen;
