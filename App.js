import React, { useState } from "react";
import MoviesReducer from "./store/reducers/MoviesReducer";
import UserMoviesReducer from "./store/reducers/UserReducers";

import { combineReducers, applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import { YellowBox } from "react-native";

import * as Fonts from "expo-font";
import { AppLoading } from "expo";

import NavigationContainer from "./navigation/NavigationContainer";

export default function App() {
  // require("react-native").unstable_enableLogBox();
  // YellowBox.ignoreWarnings = ["Warning: VirtualizedLists"];
  const [fontLoaded, setFontLoaded] = useState();

  const rootReducer = combineReducers({
    Movies: MoviesReducer,
    UserMovies: UserMoviesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const fetchFonts = () => {
    return Fonts.loadAsync({
      "apple-bold": require("./assets/Fonts/SF-Pro-Display-Bold.ttf"),
      "apple-regular": require("./assets/Fonts/SF-Pro-Text-Regular.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}


