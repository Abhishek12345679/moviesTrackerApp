import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import SearchBar from "../components/SearchBar";

import { useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = (props) => {
  const genres = [
    { id: 9648, genreName: "Mystery", genreColor: "#1abc9c" },
    { id: 27, genreName: "Horror", genreColor: "#34495e" },
    { id: 18, genreName: "Drama", genreColor: "#2980b9" },
    { id: 16, genreName: "Anime", genreColor: "#12ff" },
    { id: 16, genreName: "Adult", genreColor: "#45fe" },
    { id: 16, genreName: "Realism", genreColor: "#45f4" },
  ];

  const dispatch = useDispatch();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Images/searchScreenHeader.jpeg")}
        />
      </View>
      <SearchBar
        onPress={() => {
          props.navigation.navigate("SearchDetailScreen");
        }}
      />
      <FlatList
        style={{ marginTop: 30 }}
        scrollEnabled={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-around",
        }}
        numColumns={2}
        horizontal={false}
        data={genres}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              dispatch(MoviesAction.loadMoviesWithGenres(itemData.item.id));
              props.navigation.navigate({
                name: "GenreScreen",
                params: {
                  GenreName: itemData.item.genreName,
                },
              });
            }}
          >
            <LinearGradient
              colors={[itemData.item.genreColor, Colors.primaryColor]}
              style={{
                ...styles.genreTab,
                // backgroundColor: itemData.item.genreColor,
              }}
            >
              <Text style={{ ...styles.headerText, fontSize: 17 }}>
                {itemData.item.genreName}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export const screenOptions = {
  headerTitle: "Search",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: 300,
    flex: 1,
    resizeMode: "cover",
  },
  genreTab: {
    marginVertical: 10,
    marginHorizontal: 15,
    width: 160,
    height: 100,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.white,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});

export default SearchScreen;
