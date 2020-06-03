import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Colors from "../constants/Colors";

const MovieListItem = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={styles.listItem}
      onPress={props.onPress}
    >
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: props.posterUrl }} />
        <View style={styles.column}>
          <Text style={styles.text}>
            {
              props.movieTitle
              // .toLowerCase()
              // .replace(props.searchValue, props.searchValue)
            }
            {/* how to highlight this text */}
          </Text>
          <Text style={styles.yearText}>{props.year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primaryColor,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 10,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  yearText: {
    color: Colors.grey,
    fontFamily: "apple-bold",
    fontSize: 15,
    marginStart: 20,
    marginBottom: 5,
  },
  text: {
    fontFamily: "apple-regular",
    fontSize: 15,
    color: Colors.white,
    marginStart: 20,
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  row: {
    flexDirection: "row",
  },
});

export default MovieListItem;
