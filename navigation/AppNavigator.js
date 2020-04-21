import React from "react";
import { Text } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import MoviesScreen, {
  screenOptions as MovieScreenOptions,
} from "../screens/MoviesScreen";
import MoviesDetailsScreen, {
  screenOptions as MoviesDetailScreenOptions,
} from "../screens/MoviesDetailScreen";
import SearchScreen, {
  screenOptions as SearchScreenOptions,
} from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  headerTitleStyle: {
    //   fontFamily: "standard-apple-bold",
    fontSize: 20,
  },
  headerTintColor: "#000",
  headerBackTitle: "Back",
};

const defaultBottomTabNavigationOptions = {
  activeTintColor: "#000",
  style: { backgroundColor: "#fff", height: 50 },
  inactiveTintColor: "#fff",
  showLabel: false,
  shadowColor: "#fff",
};

const MoviesScreenStackNavigator = createStackNavigator();

const moviesScreenNavigator = () => {
  return (
    <MoviesScreenStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <MoviesScreenStackNavigator.Screen
        name="MovieScreen"
        component={MoviesScreen}
        options={MovieScreenOptions}
      />
      <MoviesScreenStackNavigator.Screen
        name="MoviesDetailsScreen"
        component={MoviesDetailsScreen}
        options={MoviesDetailScreenOptions}
      />
    </MoviesScreenStackNavigator.Navigator>
  );
};

const SearchScreenStackNavigator = createStackNavigator();

const searchScreenNavigator = () => {
  return (
    <SearchScreenStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <SearchScreenStackNavigator.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={SearchScreenOptions}
      />
      <SearchScreenStackNavigator.Screen
        name="MoviesDetailsScreen"
        component={MoviesDetailsScreen}
        options={MoviesDetailScreenOptions}
      />
    </SearchScreenStackNavigator.Navigator>
  );
};

const ProfileScreenStackNavigator = createStackNavigator();

const ProfileScreenNavigator = () => {
  return (
    <ProfileScreenStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <ProfileScreenStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </ProfileScreenStackNavigator.Navigator>
  );
};

// will try to make it custom later
const BottomNavigationBar = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <BottomNavigationBar.Navigator
      tabBarOptions={defaultBottomTabNavigationOptions}
    >
      <BottomNavigationBar.Screen
        name="MoviesScreenNavigator"
        component={moviesScreenNavigator}
        tabBarOptions={{ showLabel: false }}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Text
              style={{ fontFamily: "apple-bold", fontSize: focused ? 20 : 15 }}
            >
              M
            </Text>
          ),
          showLabel: false,
        }}
      />
      <BottomNavigationBar.Screen
        name="SearchScreenNavigator"
        component={searchScreenNavigator}
        options={{
          tabBarLabel: "sdsd",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="search1"
              size={focused ? size + 5 : size}
              color={focused ? "#000" : "#121212"}
            />
          ),
        }}
      />

      <BottomNavigationBar.Screen
        name="profileScreenNavigator"
        component={ProfileScreenNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="human-greeting"
              size={focused ? size + 5 : size}
              color={focused ? "#000" : "#121212"}
            />
          ),
        }}
      />
    </BottomNavigationBar.Navigator>
  );
};
