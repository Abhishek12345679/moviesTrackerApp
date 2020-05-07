import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

const StatePicker = (props) => {
  const [pressed, setPressed] = useState(false);

  // const initialOpacity = useRef(new Animated.Value(0)).current;
  const initialHeight = useRef(new Animated.Value(0)).current;
  const HEIGHT = 150;

  const fadeOutAnim = () => {
    Animated.timing(initialHeight, {
      toValue: HEIGHT,
      duration: 200,
    }).start();
  };

  const fadeInAnim = () => {
    Animated.timing(initialHeight, {
      toValue: 0,
      duration: 200,
    }).start();
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        activeOpacity={0.9}
        {...props}
        disabled={props.disabled}
        style={{ ...styles.picker, ...props.style }}
        onPress={() => {
          setPressed((prevState) => !prevState);
          pressed ? fadeOutAnim() : fadeInAnim();
        }}
      >
        {/* {!!!props.onPressWatched || !!!props.onPressWatching ? (
          <Text style={styles.text}>Add to My Movies</Text>
        ) : (
          <Text style={styles.text}>Watched</Text>
        )}
        {props.children} */}
      </TouchableOpacity>
      <Animated.View style={{ height: initialHeight }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.item}
          onPress={() => {
            props.onPressWatched;
            fadeInAnim();
          }}
        >
          <Text style={styles.text}>Watched</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.item}
          onPress={() => {
            props.onPressWatching;
            fadeInAnim();
          }}
        >
          <Text style={styles.text}>Currently Watching</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: 150,
  },
  item: {
    width: 150,
    height: "50%",
    backgroundColor: "#121212",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  text: {
    color: "white",
  },
  picker: {
    width: 150,
    height: 75,
    backgroundColor: "#121212",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
});

export default StatePicker;
