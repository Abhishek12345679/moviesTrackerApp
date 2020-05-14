import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Picker,
  Easing,
  ActivityIndicator,
  ActionSheetIOS,
  FlatList,
} from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

import CastMember from "../components/CastMember";

import * as UserActions from "../store/actions/UserActions";

import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import SkeletonContent from "react-native-skeleton-content";

const MovieDetailScreen = (props) => {
  const dispatch = useDispatch();
  let selectedMovieId, movies, selectedMovie;

  selectedMovieId = props.route.params.movieId;

  // const new_releases = props.route.params.new_releases;
  const all_movies = props.route.params.all_movies;
  const searched_movies = props.route.params.searched_movies;
  const moviesType = props.route.params.moviesType;
  const user_movies = useSelector((state) => state.UserMovies.userMovies);

  if (moviesType === "TV") {
    movies = useSelector((state) => state.Movies.new_tv_shows);
  } else if (all_movies) {
    movies = useSelector((state) => state.Movies.movies);
  } else if (searched_movies) {
    movies = useSelector((state) => state.Movies.searched_movies);
  } else if (moviesType === "Movies") {
    movies = useSelector((state) => state.Movies.new_releases);
  } else if (moviesType === "anime") {
    movies = useSelector((state) => state.Movies.anime);
  }

  selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
  console.log("selectedMovie", selectedMovie);

  const selectedMovieTitle = selectedMovie.title;

  const alreadySaved = user_movies.find(
    (movie) => movie.id === selectedMovie.id
  );

  // console.log("🚀", alreadySaved);

  let saved_location;
  if (!!alreadySaved) {
    saved_location =
      selectedMovie.id === alreadySaved.id
        ? alreadySaved.location
        : "Add_to_My_Movies";
  } else {
    saved_location = "Add_to_My_Movies";
  }

  let text;

  const buttonTextGenerator = () => {
    if (saved_location === "WATCHED") {
      text = "Watched";
    } else if (saved_location === "CURRENTLY_WATCHING") {
      text = "Currently Watching";
    } else if (saved_location === "WANT_TO_WATCH") {
      text = "Want to Watch";
    } else if (saved_location === "Add_to_My_Movies") {
      text = "Add to My Movies";
    }
    return text;
  };

  let [buttonText, setButtonText] = useState(buttonTextGenerator());
  const [loading, setLoading] = useState(false);

  const openActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "Add to Watched",
          "Currently Watching",
          "Want to Watch",
        ],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          //cancel
        } else if (buttonIndex === 1) {
          setLoading(true);
          setButtonText("Want to Watch");
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "WATCHED"
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else if (buttonIndex === 2) {
          setLoading(true);
          setButtonText("Currently Watching");
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "CURRENTLY_WATCHING"
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else if (buttonIndex == 3) {
          setLoading(true);
          setButtonText("Watched");
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              "WANT_TO_WATCH"
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }
    );
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
            style={{
              width: 160,
              height: 160,
              shadowColor: "#fff",
              marginHorizontal: 10,
              marginVertical: 7.5,
            }}
            id={selectedMovieId}
            posterUrl={selectedMovie.posterUrl}
            onPress={() => {}}
            ratings={selectedMovie.ratings}
          />
          {!selectedMovieTitle > 15 ? (
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
        {/* <Text style={styles.text}>Cast</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={selectedMovie.cast}
          renderItem={(itemData) => (
            <CastMember
              castName={itemData.item.name}
              posterUrl={itemData.item.profileUrl}
              character={itemData.item.character}
            />
          )}
        /> */}

        <View>
          <View style={{ width: "100%", height: 65, alignItems: "center" }}>
            <TouchableOpacity
              disabled={!!alreadySaved}
              style={styles.addtomymoviesbtn}
              onPress={() => {
                openActionSheet();
              }}
            >
              {!loading ? (
                <Text style={styles.text}>
                  {/* {!watched ? "Add to Watched" : "Watched"} */}
                  {buttonText}
                </Text>
              ) : (
                <ActivityIndicator size="small" color={Colors.lightblue} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.plotcontainer}>
          <Text style={{ ...styles.plotText, color: Colors.grey }}>
            This is the intellectual property of Moviéy (2020-)
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

export default MovieDetailScreen;
