import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View style={{ ...styles.searchbar, ...props.style }}>
        <View style={styles.inputContainer}>
          <TextInput
            {...props}
            placeholderTextColor="#ccc"
            style={styles.searchInput}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmitEditing}
          />
          <View>
            <EvilIcons name="search" size={30} color="#7d7d7d" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    width: "90%",
    height: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    marginTop: -20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: "apple-regular",
    fontSize: 15,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal:10
  },
});

export default SearchBar;
