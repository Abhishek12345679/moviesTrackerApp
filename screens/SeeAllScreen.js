import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";
import { createSelector } from "reselect";
// import SkeletonContent from "react-native-skeleton-content";

const allmovies = createSelector(
  (state) => state.Movies.new_releases,
  (new_releases) => new_releases
);

const tv = createSelector(
  (state) => state.Movies.new_tv_shows,
  (new_tv_shows) => new_tv_shows
);

const anime = createSelector(
  (state) => state.Movies.anime,
  (anime) => anime
);

const SeeAllScreen = (props) => {
  let movies;
  let goToMovies = props.route.params.new_releases;
  let goToTV = props.route.params.new_tv_shows;
  let goToAnime = props.route.params.goToAnime;
  let movieType;

  if (goToMovies) {
    movies = useSelector(allmovies);
    movieType = "Movies";
  } else if (goToTV) {
    movies = useSelector(tv);
    movieType = "TV";
  } else if (goToAnime) {
    movies = useSelector(anime);
    movieType = "anime";
  }

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
          name: "MoviesDetailScreen",
          params: {
            movieId: item.id,
            movieTitle: item.title,
            moviesType: movieType,
          },
        });
      }}
    />
  );

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (bottomLoading) {
      return <ActivityIndicator style={{ color: "#000" }} />;
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
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  const headerTitle = navData.route.params.headerTitle;
  return {
    headerTitle: headerTitle,
  };
};

export default SeeAllScreen;
