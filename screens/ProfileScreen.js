import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const [clickedDP, setClickedDP] = useState(false);
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.header}>
        <View style={styles.followers}>
          <Text style={styles.titleText}>Followers</Text>
          <Text style={styles.text}>420</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.profilepicture}
          onPress={() => setClickedDP((prevState) => !prevState)}
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
      <View style={styles.infotab}>
        <Text style={styles.titleText}>About You</Text>
        <TextInput
          style={styles.input}
          value={""}
          onChangeText={() => {}}
          placeholder="Type Name..."
        />
        <TextInput
          style={styles.input}
          value={""}
          onChangeText={() => {}}
          placeholder="Github Link here..."
        />
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.row}>
          <View style={styles.tab}></View>
          <View style={styles.tab}></View>
        </View>
        <View style={styles.row}>
          <View style={{ ...styles.tab, width: "90%" }}></View>
        </View>
      </View>
    </ScrollView>
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
  infotab: {
    width: "94%",
    height: 130,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "97%",
    height: 30,
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    marginTop: 20,
    width: "40%",
    height: 130,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "tapforabhi",
  };
};

export default ProfileScreen;
