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
        {props.posterUrl ? (
          <Image source={{ uri: props.posterUrl }} style={styles.image} />
        ) : (
          <View style={styles.image}>
            <Text style={styles.text}>?</Text>
          </View>
        )}

        <View style={styles.description}>
          <Text style={styles.text}>
            {props.castName.toString().substr(0, 10)}...
          </Text>
          <Text style={{ color: Colors.white, fontSize: 10 }}>
            as {props.character.toString().substr(0, 12)}...
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    height: 150,
  },
  item: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    height: "25%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: "hidden",
  },
});

export default CastMember;
