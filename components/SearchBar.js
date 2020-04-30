import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <TouchableWithoutFeedback
      style={{ width: "100%", alignItems: "center" }}
      onPress={props.onPress}
    >
      <View style={{ ...styles.searchbar, ...props.style }}>
        <View style={styles.inputContainer}>
          <Text style={styles.searchInput}>Type Here...</Text>
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
    backgroundColor: "#fff",
    marginTop: -20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: "apple-regular",
    fontSize: 15,
    color: "#ccc",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
  },
});

export default SearchBar;
