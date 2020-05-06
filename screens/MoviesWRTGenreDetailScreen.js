import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";

import * as UserActions from "../store/actions/UserActions";

import Colors from "../constants/Colors";
import StatePicker from "../components/StatePicker";

const MoviesWRTGenreDetailScreen = (props) => {
  const selectedMovieId = props.route.params.movieId;
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  const user_movies = useSelector((state) => state.UserMovies.userMovies);
  const selectedMovie = moviesWRTGenre.find(
    (movie) => movie.id === selectedMovieId
  );
  const selectedMovieTitle = selectedMovie.title;
  const alreadySaved = user_movies.find(
    (userMovie) => userMovie.id === selectedMovieId
  );
  console.log("selctedMovie", selectedMovie);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState(false);

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
          {!selectedMovieTitle >= 15 ? (
            <View style={styles.basicdetails}>
              <View>
                <Text style={styles.text}>{selectedMovieTitle}</Text>
              </View>

              <Text style={styles.yearText}>
                {selectedMovie.year.substr(0, 4)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.text, color: "gold" }}>
                  {selectedMovie.ratings}
                </Text>
                <AntDesign name="star" color="gold" size={23} />
              </View>
            </View>
          ) : (
            <View style={{ ...styles.basicdetails, marginHorizontal: 75 }}>
              <View>
                <Text style={{ ...styles.text, fontSize: 15 }}>
                  {selectedMovieTitle}
                </Text>
              </View>

              <Text style={styles.yearText}>
                {selectedMovie.year.substr(0, 4)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.text, color: "gold" }}>
                  {selectedMovie.ratings}
                </Text>
                <AntDesign name="star" color="gold" size={23} />
              </View>
            </View>
          )}
        </View>
        <View style={styles.plotcontainer}>
          <Text style={styles.plotText}>{selectedMovie.plot}</Text>
          <StatePicker
            disabled={!!alreadySaved}
            onPressWatched={() => {
              setLoading(true);
              dispatch(
                UserActions.saveMovies(
                  selectedMovieId,
                  selectedMovie.title,
                  selectedMovie.posterUrl,
                  selectedMovie.year
                )
              );
              setLoading(false);
              setWatched(true);
            }}
            onPressWatching={}
          />
        </View>

        {/* <TouchableOpacity
            disabled={!!alreadySaved}
            style={styles.addtomymoviesbtn}
            onPress={async () => {
              setLoading(true);
              await dispatch(
                UserActions.saveMovies(
                  selectedMovieId,
                  selectedMovie.title,
                  selectedMovie.posterUrl,
                  selectedMovie.year
                )
              );
              setLoading(false);
              setWatched(true);
            }}
          >
            {!loading ? (
              <Text style={styles.text}>
                {!watched ? "Add to My Movies" : "Watched"}
              </Text>
            ) : (
              <ActivityIndicator size="small" color={Colors.lightblue} />
            )}
          </TouchableOpacity> */}

        <View style={styles.plotcontainer}>
          <Text style={{ ...styles.plotText, color: Colors.grey }}>
            This is the intellectual properrty of Moviéy (2020-)
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
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
    padding: 10,
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
    marginVertical: 5,
    backgroundColor: "black",
    width: 200,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  plotcontainer: {
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plotText: {
    color: Colors.white,
    fontFamily: "apple-regular",
    fontSize: 12,
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
