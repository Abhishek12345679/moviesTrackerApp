import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { TextInput } from "react-native";

const SearchBar = (props) => {
  return (
    <TouchableWithoutFeedback
      style={{ width: "100%", alignItems: "center" }}
      onPress={props.onPress}
    >
      <View style={{ ...styles.searchbar, ...props.style }}>
        <View style={styles.inputContainer}>
          {!props.searchfunction ? (
            <Text style={styles.searchInput}>Type Here...</Text>
          ) : (
            <TextInput
              autoFocus={props.autoFocus}
              placeholder="Type here..."
              placeholderTextColor={Colors.grey}
              style={styles.searchInput}
              value={props.value}
              onChangeText={props.onChangeText}
            />
          )}
          <View>
            <EvilIcons name="search" size={30} color="#7d7d7d" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    width: "90%",
    height: 50,
    backgroundColor: Colors.secondaryColor,
    marginTop: -20,
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: "apple-regular",
    fontSize: 15,
    color: Colors.grey,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
  },
});

export default SearchBar;
