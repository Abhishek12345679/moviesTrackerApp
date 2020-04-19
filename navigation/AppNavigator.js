import React from "react";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import MoviesScreen from "../screens/MoviesScreen";
import MoviesDetailsScreen from "../screens/MoviesDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#121212",
    shadowColor: "#000",
  },
  headerTitleStyle: {
    //   fontFamily: "standard-apple-bold",
    fontSize: 20,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const defaultBottomTabNavigationOptions = {
  defaultNavigationOptions: {
    tabBarOptions: {
      activeTintColor: "#fff",
      style: { backgroundColor: "#ffffff", height: 20 },
      inactiveTintColor: "#000",
    },
  },
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
      />
      <MoviesScreenStackNavigator.Screen
        name="MoviesDetailsScreen"
        component={MoviesDetailsScreen}
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
      screenOptions={{
        activeTintColor: "#fff",
        style: { backgroundColor: "#000", height: 0 },
        inactiveTintColor: "#000",
      }}
    >
      <BottomNavigationBar.Screen
        name="MoviesScreenNavigator"
        component={moviesScreenNavigator}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={focused ? size + 5 : size}
              color={focused ? "#000" : "#121212"}
            />
          ),
        }}
      />
      <BottomNavigationBar.Screen
        name="SearchScreenNavigator"
        component={searchScreenNavigator}
        options={{
          tabBarLabel: "Search",
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
          tabBarLabel: "Products",
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
