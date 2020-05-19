import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import SearchBar from "../components/SearchBar";

import { useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useScrollToTop } from "@react-navigation/native";

const SearchScreen = (props) => {
  const genres = [
    {
      id: 28,
      name: "Action",
      genreColor: "#581b98",
    },
    {
      id: 12,
      name: "Adventure",
      genreColor: "#2d6cdf",
    },
    {
      id: 16,
      name: "Animation",
      genreColor: "#cabbe9",
    },
    {
      id: 35,
      name: "Comedy",
      genreColor: "#1e2a78",
    },
    {
      id: 80,
      name: "Crime",
      genreColor: "#f9ff21",
    },
    {
      id: 99,
      name: "Documentary",
      genreColor: "#3d6cb9",
    },
    {
      id: 18,
      name: "Drama",
      genreColor: "#3b9a9c",
    },
    {
      id: 10751,
      name: "Family",
      genreColor: "#586b98",
    },
    {
      id: 14,
      name: "Fantasy",
      genreColor: "#1e2a78",
    },
    {
      id: 36,
      name: "History",
      genreColor: "#3b9a9c",
    },
    {
      id: 27,
      name: "Horror",
      genreColor: "#ff9a9c",
    },
    {
      id: 10402,
      name: "Music",
      genreColor: "#f1ff21",
    },
    {
      id: 9648,
      name: "Mystery",
      genreColor: "#1e2f78",
    },
    {
      id: 10749,
      name: "Romance",
      genreColor: "#d72323",
    },
    {
      id: 878,
      name: "Science Fiction",
      genreColor: "#3e3636",
    },
    {
      id: 10770,
      name: "TV Movie",
      genreColor: "#c86f5e",
    },
    {
      id: 53,
      name: "Thriller",
      genreColor: "#0b8457",
    },
    {
      id: 10752,
      name: "War",
      genreColor: "#226089",
    },
  ];

  const dispatch = useDispatch();
  const scrollRef = React.useRef(null);

  useScrollToTop(scrollRef);

  const renderGenreTabItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        // dispatch(MoviesAction.loadMoviesWithGenres(item.id, 1));
        props.navigation.navigate({
          name: "GenreScreen",
          params: {
            GenreName: item.name,
            genreId: item.id,
          },
        });
      }}
    >
      <LinearGradient
        colors={[Colors.lightblue, item.genreColor]}
        style={{
          ...styles.genreTab,
          // backgroundColor: itemData.item.genreColor,
        }}
      >
        <Text style={{ ...styles.headerText, fontSize: 17 }}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const goToSearch = () => {
    props.navigation.navigate("SearchDetailScreen");
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={styles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Images/searchScreenHeader.jpeg")}
        />
      </View>
      <SearchBar onPress={goToSearch} />
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
        renderItem={renderGenreTabItem}
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
  screenContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  headerText: {
    fontFamily: "apple-bold",
  },
});

export default SearchScreen;
