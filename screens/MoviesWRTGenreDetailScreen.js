import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  // ActionSheetIOS,
  FlatList,
} from "react-native";
import MovieItem from "../components/MovieItem";
import CastMember from "../components/CastMember";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { AntDesign } from "@expo/vector-icons";

import * as UserActions from "../store/actions/UserActions";

import Colors from "../constants/Colors";
import { createSelector } from "reselect";

import DialogInput from "react-native-dialog-input";

const GenreMovies = createSelector(
  (state) => state.Movies.moviesWRTGenre,
  (moviesWRTGenre) => moviesWRTGenre
);

const userMovies = createSelector(
  (state) => state.UserMovies.userMovies,
  (userMovies) => userMovies
);

const MoviesWRTGenreDetailScreen = (props) => {
  const { showActionSheetWithOptions } = props;
  const [loading, setLoading] = useState(false);
  let selectedMovieId, selectedMovie;

  const moviesWRTGenre = useSelector(GenreMovies);
  const user_movies = useSelector(userMovies);

  selectedMovieId = props.route.params.movieId;

  selectedMovie = moviesWRTGenre.find((movie) => movie.id === selectedMovieId);
  // console.log("selectedMovie", selectedMovie);

  const selectedMovieTitle = selectedMovie.title;

  const alreadySaved = user_movies.find(
    (userMovie) => userMovie.id === selectedMovieId
  );

  // console.log("cast 🔥", selectedMovie.cast);
  const dispatch = useDispatch();

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
    } else {
      text = saved_location.toLowerCase();
    }
    return text;
  };

  let [buttonText, setButtonText] = useState(buttonTextGenerator());
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "Add to Watched",
          "Currently Watching",
          "Want to Watch",
          "Add New",
        ],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          //cancel
        } else if (buttonIndex === 1) {
          setLoading(true);
          setButtonText("Dekh Liya");
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
          setButtonText("Want to Watch");
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
        } else if (buttonIndex === 4) {
          setIsDialogVisible(true);
          //show an alert window to create a new board
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
            style={styles.movieItem}
            id={selectedMovieId}
            posterUrl={selectedMovie.posterUrl}
            ratings={selectedMovie.ratings}
          />
          {!selectedMovieTitle >= 15 ? (
            <View style={styles.basicdetails}>
              <View>
                <Text style={styles.text}>{selectedMovieTitle}</Text>
              </View>
              <View style={styles.ratingsContainer}>
                <Text style={styles.ratingsText}>{selectedMovie.ratings}</Text>
                <AntDesign name="star" color="gold" size={23} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.yearText}>{selectedMovie.language} | </Text>
                <Text style={styles.yearText}>
                  {selectedMovie.year.substr(0, 4)}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ ...styles.basicdetails, marginHorizontal: 75 }}>
              <View>
                <Text style={{ ...styles.text, fontSize: 15 }}>
                  {selectedMovieTitle}
                </Text>
              </View>

              <View style={styles.ratingsContainer}>
                <Text style={styles.ratingsText}>{selectedMovie.ratings}</Text>
                <AntDesign name="star" color="gold" size={23} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.yearText}>{selectedMovie.language} | </Text>
                <Text style={styles.yearText}>
                  {selectedMovie.year.substr(0, 4)}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.plotcontainer}>
          <Text style={styles.plotText}>{selectedMovie.plot}</Text>
        </View>
        {/* <View style={styles.castContainer}>
          <Text style={styles.text}>Cast</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            horizontal={true}
            data={selectedMovie.cast}
            renderItem={(itemData) => (
              <CastMember
                castName={itemData.item.name}
                posterUrl={itemData.item.profileUrl}
                character={itemData.item.character}
              />
            )}
          />
        </View> */}

        <View style={{ width: "100%", height: 65, alignItems: "center" }}>
          <TouchableOpacity
            disabled={!!alreadySaved}
            style={styles.addtomymoviesbtn}
            onPress={openActionSheet}
          >
            {!loading ? (
              <Text style={styles.text}>{buttonText}</Text>
            ) : (
              <ActivityIndicator size="small" color={Colors.lightblue} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.plotcontainer}>
          <Text style={{ ...styles.plotText, color: Colors.grey }}>
            This is the intellectual property of Moviéy (2020-)
          </Text>
        </View>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={"Create a New Board"}
          message={"Enter a New Name for a new board"}
          hintInput={"Inspirations"}
          submitInput={(inputText) => {
            //FIXME:need an action-reducer pattern here
            dispatch(
              UserActions.addBoard(
                Math.random().toString(),
                inputText.toUpperCase(),
                inputText
              )
            );
            setButtonText(inputText);
            dispatch(
              UserActions.saveMovies(
                selectedMovieId,
                selectedMovie.title,
                selectedMovie.posterUrl,
                selectedMovie.year,
                inputText.toUpperCase()
              )
            );
            setIsDialogVisible(false);
          }}
          closeDialog={() => setIsDialogVisible(false)}
        />
      </LinearGradient>
    </ScrollView>
  );
};

const ConnectedApp = connectActionSheet(MoviesWRTGenreDetailScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  movieItem: {
    width: 185,
    height: 185,
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    marginTop: 10,
    marginStart: 15,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 10,
  },
  basicdetails: {
    flexDirection: "column",
  },
  ratingsContainer: {
    flexDirection: "row",
  },
  ratingsText: {
    fontFamily: "apple-bold",
    color: "gold",
    fontSize: 20,
    padding: 3,
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
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
  castContainer: {
    height: 200,
    height: 100,
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

export default ConnectedApp;
