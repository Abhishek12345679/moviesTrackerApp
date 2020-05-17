import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import Colors from "../constants/Colors";

const CastMember = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          /** to the artists page */
        }}
      >
        <Image source={{ uri: props.posterUrl }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.description}>
        <Text style={styles.text}>
          {props.castName.toString().substr(0, 10)}...
        </Text>
        <Text style={{ color: Colors.white, fontSize: 10 }}>
          as {props.character.toString().substr(0, 12)}...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  item: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginHorizontal: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: "apple-bold",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    overflow: "hidden",
  },
});

export default CastMember;
