import React from "react";
import { StyleSheet, View, Button } from "react-native";

import config from "./config";

import NavigationContainer from "./navigation/NavigationContainer";

export default function App() {
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&i=batman`
  //     );

  //     if (!response.ok) {
  //       throw new Error("failed response");
  //     }

  //     const resData = await response.json();
  //     console.log(resData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return <NavigationContainer />;
}
