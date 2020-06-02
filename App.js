import React, { useState } from "react";
import MoviesReducer from "./store/reducers/MoviesReducer";
import UserMoviesReducer from "./store/reducers/UserReducers";

import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import * as Fonts from "expo-font";
import { AppLoading } from "expo";

import NavigationContainer from "./navigation/NavigationContainer";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState();

  const rootReducer = combineReducers({
    Movies: MoviesReducer,
    UserMovies: UserMoviesReducer,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  const fetchFonts = () => {
    return Fonts.loadAsync({
      "apple-bold": require("./assets/Fonts/SF-Pro-Display-Bold.ttf"),
      "apple-regular": require("./assets/Fonts/SF-Pro-Text-Regular.ttf"),
      "fancy-font": require("./assets/Fonts/BungeeShade-Regular.ttf"),
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
    <ActionSheetProvider>
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    </ActionSheetProvider>
  );
}
