import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import CastMember from "../components/CastMember";

const MoviesWRTGenreDetailScreen = (props) => {
  const selectedMovieId = props.route.params.movieId;
  const moviesWRTGenre = useSelector((state) => state.Movies.moviesWRTGenre);
  const selectedMovie = moviesWRTGenre.find(
    (movie) => movie.id === selectedMovieId
  );
  console.log("selctedMovie", selectedMovie);
  return (
    <ScrollView style={styles.screen}>
      <LinearGradient
        colors={["green", "#3b5998", "#000"]}
        style={styles.header}
      >
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
          <Text
            style={{
              ...styles.text,
              fontSize: 12,
              fontFamily: "apple-bold",
              color: "#c2c2c2",
            }}
          >
            {selectedMovie.year}
          </Text>
          <Text
            style={{
              ...styles.text,
              fontSize: 12,
              fontFamily: "apple-bold",
              color: "#c2c2c2",
            }}
          >
            {/* {itemData.item.plot.substr(0, itemData.item.plot.indexOf(".")) +
                "."} */}
            {/* {itemData.item.plot.substr(0, 20)} */}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.castReel}>
        <Text style={styles.headerText}>Cast</Text>
        <ScrollView
          horizontal={true}
          style={{ height: 150 }}
          showsHorizontalScrollIndicator={false}
        >
          {selectedMovie.cast.map((cast) => {
            return <CastMember key={selectedMovieId} castName={cast.name} />;
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 300,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
    // overflow: "hidden",
  },
  basicdetails: {
    justifyContent: "flex-start",
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
    paddingHorizontal: 10,
  },
  castReel: {
    marginTop: 10,
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
