import React from "react";
import { View, Text, StyleSheet } from "react-native";

const addStoryModal = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Add Story</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default addStoryModal;
