import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ActionSheetIOS,
} from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";

import * as UserActions from "../store/actions/UserActions";

import Colors from "../constants/Colors";

const MoviesWRTGenreDetailScreen = (props) => {
  useEffect(() => {
    saveButtonTextGenerator();
  }, [saveButtonTextGenerator]);

  const selectedMovieId = props.route.params.movieId;
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  const user_movies = useSelector((state) => state.UserMovies.userMovies);
  const selectedMovie = moviesWRTGenre.find(
    (movie) => movie.id === selectedMovieId
  );
  const selectedMovieTitle = selectedMovie.title;

  const watched_movies = useSelector((state) => state.UserMovies.watched);
  const watching_movies = useSelector((state) => state.UserMovies.watching);
  const wanttowatch_movies = useSelector(
    (state) => state.UserMovies.want_to_watch
  );

  const watched_initial = !!watched_movies
    ? !!watched_movies.find((watched) => watched.id === selectedMovie.id)
    : "false";

  const watching_initial = !!watching_movies
    ? !!watching_movies.find((watching) => watching.id === selectedMovie.id)
    : "false";

  const wanttowatch_initial = !!wanttowatch_movies
    ? !!wanttowatch_movies.find(
        (wanttowatch) => wanttowatch.id === selectedMovie.id
      )
    : "false";

  console.log("selctedMovie", selectedMovie);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  let [watched, setWatched] = useState(!!watched_initial);
  let [watching, setWatching] = useState(!!watching_initial);
  let [wanttowatch, setWantToWatch] = useState(!!wanttowatch_initial);
  let text;

  const openActionSheet = async () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Already Watched ",
          "Currently Watching",
          "Want to Watch",
          "Cancel",
        ],
        cancelButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "",
              "",
              "",
              "",
              "ALREADY_WATCHED"
            )
          );
          setWatched(true);
        } else if (buttonIndex === 1) {
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "",
              "",
              "",
              "",
              "CURRENTLY_WATCHING"
            )
          );
          setWatching(true);
        } else if (buttonIndex === 2) {
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "",
              "",
              "",
              "",
              "WANT_TO_WATCH"
            )
          );
          setWantToWatch(true);
        }
      }
    );

  const saveButtonTextGenerator = () => {
    // let text;
    if (watched) {
      text = "Already Saved";
      return text;
    } else if (watching) {
      text = "Currently Watching";
      return text;
    } else if (wanttowatch) {
      text = "Want to Watch";
      return text;
    } else {
      text = "Add to My Movies";
      return text;
    }
  };

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
            // onPress={() => {}}
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
            // disabled={!!watched || !!watching || !!wanttowatch}
            style={styles.addtomymoviesbtn}
            onPress={() => {
              openActionSheet()
                .then(() => {
                  setLoading(true);
                  saveButtonTextGenerator();
                  setTimeout(2000);
                })
                .then(() => {
                  setLoading(false);
                });
            }}
          >
            {!loading ? (
              <Text style={styles.text}>{text}</Text>
            ) : (
              <ActivityIndicator size="small" color={Colors.lightblue} />
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
