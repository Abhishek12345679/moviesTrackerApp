import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MovieItem = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.movieItem, ...props.style }}
      activeOpacity={0.85}
      onPress={props.onPress}
    >
      <ImageBackground
        source={{
          uri: props.posterUrl,
        }}
        style={styles.image}
      >
        <View style={styles.footer}>
          <View style={styles.description}>
            <Text style={styles.text}>{props.movieTitle}</Text>
            <Text style={styles.text}>{props.year}</Text>
          </View>
          <View style={styles.ratings}>
            <Text style={styles.text}>{props.imdbRatings}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 200,
    height: 200,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    backgroundColor: "#000",
    margin: 10,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  description: {
    flexDirection: "column",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    marginStart: 10,
    fontFamily: "apple-regular",
  },
});

export default MovieItem;
