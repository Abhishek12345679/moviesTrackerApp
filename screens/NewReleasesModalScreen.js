import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { Entypo } from "@expo/vector-icons";

const NewReleasesModalScreen = (props) => {
  const posterUrl = props.route.params.posterUrl;
  return (
      <View style={styles.screen}>
        <ImageBackground
          source={{ uri: posterUrl }}
          style={{ width: "100%", height: "100%" }}
        >
          <Entypo
            name="cross"
            size={40}
            color="#000"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
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
