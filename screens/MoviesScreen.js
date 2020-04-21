import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import MovieItem from "../components/MovieItem";

import { useSelector, useDispatch } from "react-redux";

import * as MoviesAction from "../store/actions/MoviesAction";

const MoviesScreen = (props) => {
  const trending_movies = useSelector((state) => state.Movies.movies);
  const new_releases = useSelector((state) => state.Movies.new_releases);
  const searched_movies = useSelector((state) => state.Movies.searched_movies);

  // console.log("trending movies : ", trending_movies);
  // console.log("new movies : ", new_releases);
  console.log("searched movies : ", searched_movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesAction.loadTrendingMovies());
    dispatch(MoviesAction.loadNewReleases("dog"));
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>Trending</Text>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={trending_movies}
          renderItem={(itemData) => (
            <MovieItem
              id={itemData.item.id}
              movieTitle={itemData.item.title}
              posterUrl={itemData.item.posterUrl}
              year={itemData.item.year}
              onPress={() => {
                props.navigation.navigate({
                  name: "MoviesDetailsScreen",
                  params: {
                    movieTitle: itemData.item.title,
                  },
                });
              }}
            />
          )}
        />
      </View>
      <View>
        <View style={styles.headerCont}>
          <Text style={styles.headerText}>New Releases</Text>
        </View>
        <FlatList
          horizontal={true}
          data={new_releases}
          renderItem={(itemData) => (
            <MovieItem
              style={styles.new_releases}
              id={itemData.item.id}
              movieTitle={itemData.item.title}
              posterUrl={itemData.item.posterUrl}
              year={itemData.item.year}
              onPress={() => {}}
            />
          )}
        />
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Moveey",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems:'center',
    // justifyContent:'center'
  },
  headerCont: {
    width: "100%",
    marginStart: 10,
    marginTop: 5,
  },
  headerText: {
    fontFamily: "apple-bold",
    fontSize: 30,
  },
  new_releases: {
    flex: 1,
    width: Dimensions.get("window").width - 50,
  },
});

export default MoviesScreen;
