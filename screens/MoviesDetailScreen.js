import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MoviesDetailScreen = (props) => {
  const posterUrl = props.route.params.posterUrl;
  return (
    <View style={styles.screen}>
      <Image style={styles.moviePoster} source={{ uri: posterUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  moviePoster: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
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

export default MoviesDetailScreen;
