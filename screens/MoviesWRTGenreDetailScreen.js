import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import * as UserActions from "../store/actions/UserActions";
import Colors from "../constants/Colors";

// import CastMember from "../components/CastMember";

const MoviesWRTGenreDetailScreen = (props) => {
  const selectedMovieId = props.route.params.movieId;
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  const user_movies = useSelector((state) => state.UserMovies.userMovies);
  const selectedMovie = moviesWRTGenre.find(
    (movie) => movie.id === selectedMovieId
  );
  const alreadySaved = user_movies.find(
    (userMovie) => userMovie.id === selectedMovieId
  );
  console.log("selctedMovie", selectedMovie);

  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.screen}>
      <LinearGradient
        colors={["black", Colors.lightblue]}
        style={styles.header}
      >
        <View style={styles.row}>
          <MovieItem
            footerStyle={{
              backgroundColor: null,
            }}
            style={{ width: 160, height: 160, shadowColor: "#fff" }}
            id={selectedMovieId}
            posterUrl={selectedMovie.posterUrl}
            onPress={() => {}}
            ratings={selectedMovie.ratings}
          />
          <View style={styles.basicdetails}>
            <Text style={styles.text}>{selectedMovie.title}</Text>
            <Text style={styles.yearText}>
              {selectedMovie.year.substr(0, 4)}
            </Text>
            <Text style={{ ...styles.text, color: "gold" }}>
              {selectedMovie.ratings}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={!!alreadySaved}
          style={styles.addtomymoviesbtn}
          onPress={() => {
            dispatch(
              UserActions.saveMovies(
                selectedMovieId,
                selectedMovie.title,
                selectedMovie.posterUrl,
                selectedMovie.year
              )
            );
          }}
        >
          {!alreadySaved ? (
            <Text style={styles.text}>Add to My Movies</Text>
          ) : (
            <Text style={styles.text}>Watched</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
  },
  basicdetails: {
    flexDirection: "column",
  },
  text: {
    fontFamily: "apple-bold",
    color: "#FFF",
    fontSize: 20,
  },
  headerText: {
    fontFamily: "apple-bold",
    color: "#000",
    fontSize: 30,
  },
  castReel: {
    marginTop: 10,
  },
  yearText: {
    fontSize: 12,
    fontFamily: "apple-bold",
    color: "#c2c2c2",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  addtomymoviesbtn: {
    marginBottom: 5,
    marginHorizontal: 20,
    backgroundColor: "black",
    width: 200,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  let title = navData.route.params.movieTitle;
  if (title.length > 18) {
    title = title.substr(0, 18) + "...";
  }
  return {
    headerTitle: title,
  };
};

export default MoviesWRTGenreDetailScreen;
