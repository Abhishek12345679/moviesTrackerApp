import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// import { CommonActions } from '@react-navigation/native';

const HeaderSearchComponent = (props) => {
  return (
    <TouchableOpacity {...props} style={styles.item} onPress={props.onpress}>
      <Ionicons
        name="ios-search"
        size={20}
        color={Colors.white}
        style={{ marginStart: 15 }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    width: 70,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.primaryColor,
    shadowColor: "#c3c3c3",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    justifyContent: "center",
    marginEnd: 5,
  },
});

export default HeaderSearchComponent;
