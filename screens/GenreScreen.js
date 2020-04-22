import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GenreScreen = (props) => {
  return (
    <View style={styles.screen}>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.GenreName;
  return {
    headerTitle: headerTitle,
  };
};

export default GenreScreen;
