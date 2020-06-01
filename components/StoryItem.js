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
      <View style={{...styles.background,...props.style}}>
        {/* <Image
          resizeMode="cover"
          source={{ uri: props.posterUrl }}
          style={styles.image}
        /> */}
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
  background: {
    width: 85,
    height: 85,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 85 / 2,
    padding: 0,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StoryItem;
