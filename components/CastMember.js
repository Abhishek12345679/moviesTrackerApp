import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const CastMember = (props) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      {/* <Text style={styles.text}>{props.castName}</Text> */}
      <ImageBackground
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAQIrdbmjst8ULAyvfqem53sMDC1WCkUXmhJEu2KwXYtae7ZzY&usqp=CAU",
        }}
        style={styles.image}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    marginTop: 10,

    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 2,
  },
  text: {
    fontFamily: "apple-bold",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
});

export default CastMember;
