import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const [clickedDP, setClickedDP] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.followers}>
          <Text style={styles.titleText}>Followers</Text>
          <Text style={styles.text}>420</Text>
        </View>
        <TouchableOpacity
          style={styles.profilepicture}
          onPress={(prevState) => setClickedDP(!prevState)}
        >
          {clickedDP ? (
            <Image
              style={styles.dp}
              source={{
                uri:
                  "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/94532354_240152954002694_3749616306081497088_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=PEqjbLghmN8AX9EKa6x&oh=e89db1a621feb1d6dcf13d63f69c20b9&oe=5ECEDAE3",
              }}
            />
          ) : (
            <AntDesign name="caretright" size={60} color="#FFF" />
          )}
        </TouchableOpacity>
        <View style={styles.followers}>
          <Text style={styles.titleText}>Following</Text>
          <Text style={styles.text}>69</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dp: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  profilepicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#ff8c00",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  titleText: {
    fontFamily: "apple-bold",
    fontSize: 15,
  },
  text: {
    fontFamily: "apple-bold",
    fontSize: 12,
    color: "#a9a9a9",
  },
  followers: {},
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Profile",
  };
};

export default ProfileScreen;
