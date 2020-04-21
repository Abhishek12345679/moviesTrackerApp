import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MovieListItem = (props) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.listItem}
        {...props}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.movieTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "apple-regular",
    fontSize: 15,
    color: "#000",
    marginStart: 20,
    marginBottom: 10,
  },
  hr: {
    width: "90%",
    backgroundColor: "#ccc",
    height: 1,
  },
});

export default MovieListItem;
