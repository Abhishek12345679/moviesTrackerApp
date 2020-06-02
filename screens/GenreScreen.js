import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

import * as MovieAction from "../store/actions/MoviesAction";

const genreMovies = createSelector(
  (state) => state.Movies.moviesWRTGenre,
  (moviesWRTGenre) => moviesWRTGenre
);

const GenreScreen = (props) => {
  const selectedGenre = props.route.params.genreId;
  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (bottomLoading) {
      return <ActivityIndicator size="small" color={Colors.lightblue} />;
    } else {
      return null;
    }
  };

  const handleLoadMore = async () => {
    setBottomLoading(true);
    try {
      await dispatch(MovieAction.loadMoviesWithGenres(selectedGenre, page + 1));
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }

    setBottomLoading(false);
  };

  const loadScreen = useCallback(async () => {
    try {
      await dispatch(MovieAction.loadMoviesWithGenres(selectedGenre, page));
    } catch (err) {
      console.log(err);
      return;
    }
  }, [dispatch]);

  const clearScreen = useCallback(async () => {
    try {
      await dispatch(MovieAction.clearGenreScreen());
    } catch (err) {
      console.log(err);
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadScreen().then(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setLoading(true);
  //     loadScreen().then(() => setLoading(false));
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  //how to trigger goback ...

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("blur", () => {
  //     setLoading(true);
  //     clearScreen().then(() => setLoading(false));
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";

  const moviesWRTGenre = useSelector(genreMovies);

  const renderItem = ({ item }) => (
    <MovieItem
      style={{ width: 175, height: 175 }}
      id={item.id}
      movieTitle={item.title}
      posterUrl={posterBaseUrl + item.posterUrl}
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

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="small" color={Colors.lightblue} />
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
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
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
