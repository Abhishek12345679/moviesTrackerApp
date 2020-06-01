import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import * as Linking from "expo-linking";

const Wrapper = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.wrapperText}>{props.value}</Text>
    </View>
  );
};

const Anchor = (props) => {
  const handlePress = () => {
    Linking.openURL(props.href);
    // props.onPress && props.onPress();
  };

  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 5,
        padding: 5,
      }}
    >
      <Text style={props.style} onPress={handlePress}>
        {props.children}
      </Text>
    </View>
  );
};

const NewReleasesModalScreen = (props) => {
  const storyId = props.route.params.id;

  const randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  const userStories = useSelector((state) => state.UserMovies.stories);
  const selectedStory = userStories.find((story) => story.id === storyId);

  return (
    <View style={{ ...styles.screen, backgroundColor: randomColor }}>
      <View style={{ padding: 15 }}>
        <Text style={{ ...styles.text, fontSize: 25 }}>
          Watch what you wish
        </Text>
        <Text style={{ ...styles.text, fontSize: 12 }}>
          with ❤️ from the Movii Community
        </Text>
      </View>
      <View style={styles.form}>
        <View style={styles.row}>
          <Wrapper value="Movie" />
          <View style={styles.infotext}>
            <Text style={styles.text}>{selectedStory.title}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Wrapper value="Genres" />
          <View style={styles.infotext}>
            <Text style={styles.text}>{selectedStory.genres}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Wrapper value="Language" />
          <View style={styles.infotext}>
            <Text style={styles.text}>{selectedStory.language}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Wrapper value="Link" />
          <View style={styles.infotext}>
            <Anchor style={styles.text} href={selectedStory.movieLink}>
              {selectedStory.movieLink.substr(0, 20)}
            </Anchor>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.randomColor,
    // alignItems: "center",
  },
  text: {
    fontFamily: "apple-bold",
    fontSize: 15,
    color: Colors.white,
    textAlignVertical: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginVertical: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  wrapper: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  wrapperText: {
    fontFamily: "apple-regular",
    fontSize: 15,
    color: Colors.grey,
  },
  infotext: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default NewReleasesModalScreen;
