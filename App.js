import React from "react";
import MoviesReducer from "./store/reducers/MoviesReducer";

import { combineReducers, applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import NavigationContainer from "./navigation/NavigationContainer";

export default function App() {
  const rootReducer = combineReducers({
    Movies: MoviesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
