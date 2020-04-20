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
      style={styles.movieItem}
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
    overflow:'hidden'
  },
  footer: {
    marginStart: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "#000",
    opacity: 0.8,
  },
  description: {
    flexDirection: "column",
  },
  text: {
    color: "#fff",
    marginVertical: 1,
  },
});

export default MovieItem;
