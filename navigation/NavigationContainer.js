import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "../navigation/AppNavigator";

const AppContainer = (props) => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
