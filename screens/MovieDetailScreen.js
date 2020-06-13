import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  // ActionSheetIOS,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { connectActionSheet } from "@expo/react-native-action-sheet";

import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

import MovieItem from "../components/MovieItem";
import CastMember from "../components/CastMember";

import * as UserActions from "../store/actions/UserActions";

// import SkeletonContent from "react-native-skeleton-content";
import DialogInput from "react-native-dialog-input";

const MovieDetailScreen = (props) => {
  const { showActionSheetWithOptions } = props;
  const dispatch = useDispatch();
  let selectedMovieId, movies, selectedMovie;

  selectedMovieId = props.route.params.movieId;

  // const new_releases = props.route.params.new_releases;
  const all_movies = props.route.params.all_movies;
  const searched_movies = props.route.params.searched_movies;
  const moviesType = props.route.params.moviesType;

  const user_movies = useSelector((state) => state.UserMovies.userMovies);
  const boards = useSelector((state) => state.UserMovies.boards);

  // is it neccesary to optimize here ? if yes, then how to do it ?
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
  // console.log("selectedMovie", selectedMovie);

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
    } else {
      text = saved_location.toLowerCase();
    }
    return text;
  };

  let [buttonText, setButtonText] = useState(buttonTextGenerator());
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  // console.log(boards);
  let boardstest = [
    "Add New",
    "Cancel",
    "Add to Watched",
    "Currently Watching",
    "Want to Watch",
  ];

  boards.forEach((item) => {
    boardstest.push(item.title);
  });

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        // options: [
        //   "Cancel",
        //   "Add to Watched",
        //   "Currently Watching",
        //   "Want to Watch",
        //   "Add New",
        // ],
        options: boardstest,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          //cancel
        } else if (buttonIndex === 2) {
          setLoading(true);
          setButtonText("Watched");
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
        } else if (buttonIndex === 3) {
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
        } else if (buttonIndex === 4) {
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
        } else if (buttonIndex === 1) {
          setIsDialogVisible(true);
          //show an alert window to create a new board
        } else {
          setLoading(true);
          setButtonText(boardstest[buttonIndex]);
          dispatch(
            UserActions.saveMovies(
              selectedMovieId,
              selectedMovie.title,
              selectedMovie.posterUrl,
              selectedMovie.year,
              boardstest[buttonIndex].toUpperCase()
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }
    );
  };

  const renderCastItem = ({ item }) => (
    <CastMember
      castName={item.name}
      posterUrl={item.profileUrl}
      character={item.character}
    />
  );

  return (
    <ScrollView style={styles.screen}>
      <LinearGradient
        colors={["black", Colors.lightblue]}
        style={styles.header}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: selectedMovie.posterUrl }}
            style={styles.movieItem}
          />
          {!selectedMovieTitle > 15 ? (
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
          <Text style={styles.plotText}>
            {selectedMovie.plot.toString().substr(0, 500)}...
          </Text>
        </View>
        {/* <Text style={styles.text}>Cast</Text>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={selectedMovie.cast}
          renderItem={renderCastItem}
        /> */}
        <View style={styles.savebtnContainer}>
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

const ConnectedApp = connectActionSheet(MovieDetailScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  header: {
    width: "100%",
    height: "100%",
  },
  movieItem: {
    width: "100%",
    height: 250,
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 10,
  },
  hideFooter: {
    backgroundColor: null,
  },
  basicdetails: {
    flexDirection: "column",
  },
  text: {
    // fontFamily: "fancy-font",
    fontFamily: "apple-bold",
    color: "#FFF",
    fontSize: 15,
    padding: 3,
  },
  headerText: {
    fontFamily: "apple-bold",
    color: "#000",
    fontSize: 30,
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
  yearText: {
    fontSize: 12,
    fontFamily: "apple-bold",
    color: "#c2c2c2",
  },
  // row: {
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
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
  savebtnContainer: {
    width: "100%",
    height: 65,
    alignItems: "center",
    marginTop: 20,
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

export default ConnectedApp;
