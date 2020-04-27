import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as UserMoviesActions from "../store/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const SwipeableListItem = (props) => {
  const dispatch = useDispatch();
  const userMovies = useSelector((state) => state.UserMovies.userMovies);
  const touchThreshold = 20;
  const gestureDelay = -35;
  let scrollViewEnabled;
  let setScrollViewEnabled = (props.setScrollEnabled[
    (scrollViewEnabled, setScrollViewEnabled)
  ] = useState(true));

  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      () => props.onPress;
      return false;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx, dy } = gestureState;

      return Math.abs(dx) > touchThreshold || Math.abs(dy) > touchThreshold;
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 35) {
        // setScrollViewEnabled(false);
        let newX = gestureState.dx + gestureDelay;
        position.setValue({ x: newX < 100 ? newX : 100, y: 0 });
        setScrollViewEnabled(false);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: 150,
      }).start(() => {
        setScrollViewEnabled(true);
        
        // console.log("userMOvies", userMovies);
      });
    },
  });

  setScrollViewEnabled = (enabled) => {
    props.setScrollEnabled(enabled);
    scrollViewEnabled = enabled;
  };

  return (
    <Animated.View style={[position.getLayout()]} {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.listItem} onPress={props.onPress}>
        <View style={styles.absoluteCell}>
          <Text style={styles.absoluteCellText}>DELETE</Text>
        </View>
        <View style={styles.innerCell}>
          <Text style={{ fontFamily: "apple-regular", fontSize: 15 }}>
            {props.movieTitle}
          </Text>
          <Text style={{ color: "#121212" }}>{props.year}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 55,
    marginLeft: -100,
    justifyContent: "center",
    backgroundColor: "red",
  },
  absoluteCell: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerCell: {
    width: Dimensions.get("window").width,
    height: 80,
    marginLeft: 100,
    backgroundColor: "#FFF",
    padding: 20,
  },
  absoluteCellText: {
    fontFamily: "apple-regular",
    marginEnd: 15,
    color: "#FFF",
  },
});

export default SwipeableListItem;
