import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const StoryItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      style={styles.movieItem}
    >
      <View
        style={{
          width: 85,
          height: 85,
          justifyContent: "flex-end",
          overflow: "hidden",
          borderRadius: 85 / 2,
          padding: 0,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: props.posterUrl }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 90,
    height: 90,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    backgroundColor: Colors.lightblue,
    marginHorizontal: 25,
    // marginVertical: 7.5,
    flexDirection: "column",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 40,
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

export default StoryItem;
