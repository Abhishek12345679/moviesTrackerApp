import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

import * as MovieAction from "../store/actions/MoviesAction";
import { ActivityIndicator } from "react-native-paper";

const genreMovies = createSelector(
  (state) => state.Movies.moviesWRTGenre,
  (moviesWRTGenre) => moviesWRTGenre
);

const GenreScreen = (props) => {
  const selectedGenre = props.route.params.genreId;

  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     dispatch(MovieAction.clearGenreScreen());
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const loadScreen = useCallback(async () => {
    try {
      await dispatch(MovieAction.loadMoviesWithGenres(selectedGenre));
    } catch (err) {
      console.log(err);
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    setTopLoading(true);
    loadScreen().then(() => setTopLoading(false));
  }, [loadScreen]);

  const moviesWRTGenre = useSelector(genreMovies);
  // let [tmpLongList,setTmpLongList] =

  const renderItem = ({ item }) => (
    <MovieItem
      style={{ width: 175, height: 175 }}
      id={item.id}
      movieTitle={item.title}
      posterUrl={item.posterUrl}
      year={item.year}
      onPress={() => {
        props.navigation.navigate({
          name: "MoviesWRTGenreDetailScreen",
          params: {
            movieId: item.id,
            movieTitle: item.title,
          },
        });
      }}
    />
  );

  if (topLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.lightblue} />
      </View>
    );
  }

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
