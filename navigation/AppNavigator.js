import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import MoviesScreen, {
  screenOptions as MovieScreenOptions,
} from "../screens/MoviesScreen";

import MoviesWRTGenreDetailScreen, {
  screenOptions as MoviesWRTGenreDetailScreenOptions,
} from "../screens/MoviesWRTGenreDetailScreen";

import MoviesDetailScreen, {
  screenOptions as MoviesDetailScreenOptions,
} from "../screens/MovieDetailScreen";

import SearchScreen, {
  screenOptions as SearchScreenOptions,
} from "../screens/SearchScreen";
import GenreScreen, {
  screenOptions as GenreScreenOptions,
} from "../screens/GenreScreen";
import ProfileScreen, {
  screenOptions as ProfileScreenOptions,
} from "../screens/ProfileScreen";

import SearchDetailScreen, {
  screenOptions as SearchDetailScreenOptions,
} from "../screens/SearchDetailScreen";

import NewReleasesModalScreen from "../screens/NewReleasesModalScreen";
import SeeAllScreen, {
  screenOptions as SeeAllScreenOptions,
} from "../screens/SeeAllScreen";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";

// const deviceWidth = Dimensions.get("window").width;

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: Dimensions.get("window").width / 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 65,
        backgroundColor: "#262626",
        borderRadius: 30,
        width: "80%",
        marginLeft: 40,
        marginRight: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const IconNames = ["medium-monogram", "search1", "man"];

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              width: (Dimensions.get("window").width * 13) / 25 / 2,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
              fontSize: 15,
            }}
          >
            <AntDesign
              name={IconNames[index]}
              size={25}
              color={isFocused ? Colors.lightblue : Colors.grey}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.secondaryColor,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerTitleStyle: {
    fontFamily: "apple-bold",
    fontSize: 20,
  },
  headerTintColor: Colors.lightblue,
  headerBackTitle: "Back",
};

const MoviesScreenStackNavigator = createStackNavigator();

const moviesScreenNavigator = () => {
  return (
    <MoviesScreenStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      {/* <MoviesScreenStackNavigator.Screen
        name="MovieScreen"
        component={MoviesScreen}
        options={MovieScreenOptions}
      /> */}

      <MoviesScreenStackNavigator.Screen
        name="NewReleasesNavigator"
        component={newReleasesNavigator}
        options={{ headerTitle: "Moviéy" }}
      />

      <MoviesScreenStackNavigator.Screen
        name="SeeAllScreen"
        component={SeeAllScreen}
        options={SeeAllScreenOptions}
      />
      <MoviesScreenStackNavigator.Screen
        name="MoviesDetailScreen"
        component={MoviesDetailScreen}
        options={MoviesDetailScreenOptions}
      />
    </MoviesScreenStackNavigator.Navigator>
  );
};

const NewReleasesStackNavigator = createStackNavigator();

const newReleasesNavigator = () => {
  return (
    <NewReleasesStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
      initialRouteName="MovieScreen"
      mode="modal"
    >
      <NewReleasesStackNavigator.Screen
        name="MovieScreen"
        component={MoviesScreen}
        options={{ ...MovieScreenOptions, headerShown: false }}
      />
      <NewReleasesStackNavigator.Screen
        name="NewReleasesModalScreen"
        component={NewReleasesModalScreen}
        options={{ headerShown: false }}
      />
    </NewReleasesStackNavigator.Navigator>
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
        name="SearchDetailScreen"
        component={SearchDetailScreen}
        options={{
          ...SearchDetailScreenOptions,
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
      <SearchScreenStackNavigator.Screen
        name="MoviesDetailScreen"
        component={MoviesDetailScreen}
        options={MoviesDetailScreenOptions}
      />
      <SearchScreenStackNavigator.Screen
        name="GenreScreen"
        component={GenreScreen}
        options={GenreScreenOptions}
      />
      <SearchScreenStackNavigator.Screen
        name="MoviesWRTGenreDetailScreen"
        component={MoviesWRTGenreDetailScreen}
        options={MoviesWRTGenreDetailScreenOptions}
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
        options={ProfileScreenOptions}
      />
    </ProfileScreenStackNavigator.Navigator>
  );
};

// will try to make it custom later
const BottomNavigationBar = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <BottomNavigationBar.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <BottomNavigationBar.Screen
        name="MoviesScreenNavigator"
        component={moviesScreenNavigator}
        tabBarOptions={{ showLabel: false }}
        options={{
          tabBarLabel: "movies",
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontFamily: "apple-bold",
                fontSize: focused ? 20 : 15,
                color: focused ? Colors.white : Colors.white,
              }}
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
          tabBarLabel: "search",
          tabBarLabel: ({ focused, tintColor: color }) => (
            <MaterialCommunityIcons
              name="human-greeting"
              size={focused ? size + 5 : size}
              color={focused ? Colors.lightblue : Colors.grey}
            />
          ),
        }}
      />

      <BottomNavigationBar.Screen
        name="profileScreenNavigator"
        component={ProfileScreenNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="human-greeting"
              size={focused ? size + 5 : size}
              color={focused ? Colors.lightblue : Colors.grey}
            />
          ),
        }}
      />
    </BottomNavigationBar.Navigator>
  );
};
