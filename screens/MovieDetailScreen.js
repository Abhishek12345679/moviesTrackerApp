import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MovieItem from "../components/MovieItem";
import { useSelector } from "react-redux";

import CastMember from "../components/CastMember";

const MovieDetailScreen = (props) => {
  const selectedMovieId = props.route.params.movieId;
  const movies = useSelector((state) => state.Movies.movies);
  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
  console.log("selctedMovie", selectedMovie);

  return (
    <ScrollView style={styles.screen}>
      <View>
        <View style={styles.header}>
          <MovieItem
            footerStyle={{
              backgroundColor: null,
            }}
            style={{ width: 160, height: 160, shadowColor: "#fff" }}
            id={selectedMovieId}
            posterUrl={selectedMovie.posterUrl}
            onPress={() => {}}
            // ratings={selectedMovie.ratings}
          />
          <View style={styles.basicdetails}>
            <Text style={styles.text}> {selectedMovie.title} </Text>
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
        </View>
      </View>
      <View>
        <Text style={styles.headerText}> Cast </Text>
        <ScrollView
          horizontal={true}
          style={{ height: 150 }}
          showsHorizontalScrollIndicator={false}
        >
          {selectedMovie.cast.map((cast) => {
            return <CastMember castName={cast.name} />;
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
    margin: 20,
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
