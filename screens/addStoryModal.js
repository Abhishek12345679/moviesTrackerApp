import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Switch,
} from "react-native";

import Colors from "../constants/Colors";

const addStoryModal = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View stle={styles.headerTextContainer}>
          <Text style={styles.BigText}>Share Movies</Text>
          <Text style={styles.smallText}>Share Joy</Text>
        </View>
        <Button title="share" color={Colors.lightblue} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <TextInput style={{ backgroundColor: "#fff" }} />
        <TextInput />
        <TextInput />
        <TextInput />
      </View>
      <View>
        <Text></Text>
        <Switch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2e2d2d",
    shadowOpacity: 0.5,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  BigText: {
    fontFamily: "apple-bold",
    fontSize: 25,
    color: Colors.white,
  },
  smallText: {
    fontFamily: "apple-regular",
    fontSize: 15,
    color: Colors.white,
  },
});

export default addStoryModal;
