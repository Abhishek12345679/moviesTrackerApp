import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MovieItem = (props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      onPress={props.onPress}
      style={{ ...styles.movieItem, ...props.style }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: props.posterUrl }}
        style={{ ...styles.image, ...props.imageStyle }}
      />
      <View>
        <View style={styles.description}>
          <Text style={styles.text}>{props.movieTitle}</Text>
          {/* <Text style={styles.text}>{props.year}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 150,
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    marginHorizontal: 25,
    // marginVertical: 7.5,
    flexDirection: "column",
    borderRadius: 10,
    justifyContent:'center',
    // alignItems:'center'
  },
  image: {
    width: "100%",
    height: "85%",
    borderRadius: 5,
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
    marginVertical: 5,
  },
  text: {
    color: "#FFF",
    marginStart: 10,
    fontFamily: "apple-bold",
  },
});

export default MovieItem;
