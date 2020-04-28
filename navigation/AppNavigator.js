import React from "react";
import { Text, Dimensions } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

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

import NewReleasesModalScreen from "../screens/NewReleasesModalScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { isIphoneX } from "../Helpers/iPhoneModel";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    fontFamily: "apple-bold",
    fontSize: 20,
  },
  headerTintColor: "#000",
  headerBackTitle: "Back",
};

const defaultBottomTabNavigationOptions = {
  activeTintColor: "#000",
  style: {
    backgroundColor: "#fff",
    height: Dimensions.get("window").height >= 800 ? 75 : 50,
  },
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
      {/* <MoviesScreenStackNavigator.Screen
        name="MovieScreen"
        component={MoviesScreen}
        options={MovieScreenOptions}
      /> */}

      <MoviesScreenStackNavigator.Screen
        name="NewReleasesNavigator"
        component={newReleasesNavigator}
        options={{ headerTitle: "Movies" }}
      />
      <MoviesScreenStackNavigator.Screen
        name="MoviesWRTGenreDetailScreen"
        component={MoviesWRTGenreDetailScreen}
        options={MoviesWRTGenreDetailScreenOptions}
      />
      <MoviesScreenStackNavigator.Screen
        name="MoviesDetailScreen"
        component={MoviesDetailScreen}
        options={MoviesDetailScreenOptions}
      />

      <MoviesScreenStackNavigator.Screen
        name="GenreScreen"
        component={GenreScreen}
        options={GenreScreenOptions}
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
      <MoviesScreenStackNavigator.Screen
        name="MoviesDetailScreen"
        component={MoviesDetailScreen}
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
        options={ProfileScreenOptions}
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
              style={{
                fontFamily: "apple-bold",
                fontSize: focused ? 20 : 15,
                color: focused ? "orange" : "#121212",
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
          tabBarLabel: "sdsd",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="search1"
              size={focused ? size + 5 : size}
              color={focused ? "orange" : "#121212"}
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
              color={focused ? "orange" : "#121212"}
            />
          ),
        }}
      />
    </BottomNavigationBar.Navigator>
  );
};

// const MainNavigator = createStackNavigator();

// export const MainStackNavigator = () => {
//   return (
//     <MainNavigator.Navigator screenOptions={{ headerShown: false }}>
//       <MainNavigator.Screen name="bottom-tab" component={AppNavigator} />
//       <MainNavigator.Screen
//         name="NewReleasesModalNavigator"
//         component={newReleasesNavigator}
//       />
//     </MainNavigator.Navigator>
//   );
// };
