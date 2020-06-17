//TODO: do the same changes for genreDetailScreen
//TODO: outsource home and extra fragments

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
  SegmentedControlIOS,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { connectActionSheet } from "@expo/react-native-action-sheet";

import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

// import CastMember from "../components/CastMember";

import * as UserActions from "../store/actions/UserActions";

// import SkeletonContent from "react-native-skeleton-content";
import DialogInput from "react-native-dialog-input";

const MovieDetailScreen = (props) => {
  const { showActionSheetWithOptions } = props;
  const dispatch = useDispatch();
  let selectedMovieId, movies, selectedMovie;

  selectedMovieId = props.route.params.movieId;

  const all_movies = props.route.params.all_movies;
  const searched_movies = props.route.params.searched_movies;
  const moviesType = props.route.params.moviesType;

  const user_movies = useSelector((state) => state.UserMovies.userMovies);
  const boards = useSelector((state) => state.UserMovies.boards);

  const [shrunkenPlotState, setShrunkenPlotState] = useState(true);
  const [index, setIndex] = useState(0);

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

  // const renderCastItem = ({ item }) => (
  //   <CastMember
  //     castName={item.name}
  //     posterUrl={item.profileUrl}
  //     character={item.character}
  //   />
  // );

  return (
    <ScrollView style={styles.screen}>
      <LinearGradient
        colors={[Colors.lightblue, "black"]}
        style={styles.header}
      >
        <View style={styles.row}>
          <LinearGradient
            colors={[Colors.lightblue, "black"]}
            style={{
              ...styles.movieItem,
              // position: "absolute",
              opacity: 0.7,
              // justifyContent: "flex-end",
              // alignItems: "flex-end",
            }}
          >
            <Image
              source={{ uri: selectedMovie.posterUrl }}
              style={styles.movieItem}
            />
          </LinearGradient>
          <View
            style={{
              ...styles.movieItem,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              position: "absolute",
              marginTop: 25,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              disabled={!!alreadySaved}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: Colors.primaryColor,
              }}
              onPress={openActionSheet}
            >
              {!loading ? (
                <AntDesign name="plus" size={23} color="#fff" />
              ) : (
                <ActivityIndicator size="small" color={Colors.lightblue} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <SegmentedControlIOS
              style={{ width: 200, height: 30, padding: 0 }}
              backgroundColor="#ccc"
              values={["Home", "Extra"]}
              selectedIndex={index}
              onChange={(event) => {
                setIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </View>
          <View style={styles.basicdetails}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.text}>{selectedMovieTitle}</Text>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.yearText}>
                  {selectedMovie.year.substr(0, 4)} |
                </Text>
                <Text style={styles.yearText}>{selectedMovie.language} | </Text>
                <Text style={styles.yearText}> Runtime </Text>
              </View>
            </View>
            <View style={styles.ratingsContainer}>
              <Text style={styles.ratingsText}>{selectedMovie.ratings}</Text>
              <AntDesign name="star" color="gold" size={23} />
            </View>
          </View>
        </View>

        <View style={styles.plotcontainer}>
          <View style={styles.textWrapper}>
            <Text style={{ ...styles.text, color: "black" }}>Plot</Text>
          </View>
          {shrunkenPlotState ? (
            <Text style={styles.plotText}>
              {selectedMovie.plot.toString().substr(0, 100)}...
            </Text>
          ) : (
            <Text style={styles.plotText}>{selectedMovie.plot.toString()}</Text>
          )}
          <Text
            style={{
              ...styles.plotText,
              color: "#fff",
              fontFamily: "apple-bold",
              marginTop: 3,
            }}
            onPress={() => {
              setShrunkenPlotState((state) => !state);
            }}
          >
            {shrunkenPlotState ? "See more" : "See Less"}
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

        <View style={{ ...styles.plotcontainer }}>
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
        <View
          style={{ width: "100%", height: 50, backgroundColor: "#000" }}
        ></View>
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
    height: 300,
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 10,
    marginBottom: 10,
  },
  hideFooter: {
    backgroundColor: null,
  },
  basicdetails: {
    flexDirection: "row",
    // marginStart: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text: {
    // fontFamily: "fancy-font",
    fontFamily: "apple-bold",
    color: "#FFF",
    fontSize: 17,
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
    fontSize: 16,
    fontFamily: "apple-regular",
    color: "#c2c2c2",
  },
  plotcontainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  plotText: {
    color: Colors.white,
    fontFamily: "apple-regular",
    fontSize: 15,
  },
  textWrapper: {
    width: 75,
    height: 25,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
