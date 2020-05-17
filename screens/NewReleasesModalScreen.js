import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { Entypo } from "@expo/vector-icons";

const NewReleasesModalScreen = (props) => {
  const posterUrl = props.route.params.posterUrl;

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={{ uri: posterUrl }}
        style={{ width: "100%", height: "100%" }}
      >
        <Entypo name="cross" size={40} color="#000" onPress={goBack} />
        <Text>{props.movieTitle}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default NewReleasesModalScreen;
