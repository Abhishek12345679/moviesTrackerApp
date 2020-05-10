import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import Colors from "../constants/Colors";

const CastMember = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        {/* <Text style={styles.text}>{props.castName}</Text> */}
        <Image
          source={{
            uri: props.posterUrl,
          }}
          style={styles.image}
        ></Image>
      </TouchableOpacity>
      <Text style={styles.text}>{props.castName}</Text>
      <Text style={{ color: Colors.white }}>as {props.character}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 10,

    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 2,
  },
  text: {
    fontFamily: "apple-bold",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
});

export default CastMember;
