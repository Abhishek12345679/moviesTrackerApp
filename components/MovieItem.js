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
      {...props}
      style={{ ...styles.movieItem, ...props.style }}
      activeOpacity={0.85}
      onPress={props.onPress}
    >
      <ImageBackground
        source={{
          uri: props.posterUrl,
        }}
        style={{ ...styles.image, ...props.imageStyle }}
      >
        <View style={{ ...styles.footer, ...props.footerStyle }}>
          <View style={styles.description}>
            <Text style={styles.text}>{props.movieTitle}</Text>
            <Text style={styles.text}>{props.year}</Text>
          </View>
          <View style={styles.ratings}>
            <Text style={styles.text}>{props.ratings}</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    backgroundColor: "#000",
    marginHorizontal: 15,
    marginVertical: 7.5,
    flexDirection: "column",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 5,
    padding: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    opacity: 0.5,
    height: 45,
    alignItems: "center",
  },
  description: {
    flexDirection: "column",
    marginBottom: 5,
  },
  text: {
    color: "#FFF",
    marginStart: 10,
    fontFamily: "apple-bold",
  },
});

export default MovieItem;
