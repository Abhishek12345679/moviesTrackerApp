import React, { useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";

import * as UserActions from "../store/actions/UserActions";
import * as MovieAction from "../store/actions/MoviesAction";

import Colors from "../constants/Colors";

// import CastMember from "../components/CastMember";

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

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //      moviesWRTGenre = useSelector(
  //       (state) => state.Movies.moviesWRTGenre
  //     );
  //     // The screen is focused
  //     // Call any action
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

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
        </View>

        <View style={{ width: "100%", height: 65, alignItems: "center" }}>
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
        </View>
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
    marginBottom: 5,
    marginHorizontal: 20,
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
