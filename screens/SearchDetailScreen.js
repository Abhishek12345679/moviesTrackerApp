import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";

// import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as UserMoviesActions from "../store/actions/UserActions";

import SearchBar from "../components/SearchBar";

import MovieListItem from "../components/MovieListItem";
// import SwipeableListItem from "../components/SwipeableListItem";

import * as MoviesActions from "../store/actions/MoviesAction";
import Colors from "../constants/Colors";

const SearchDetailScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const SearchList = useSelector((state) => state.Movies.searched_movies);

  const dispatch = useDispatch();

  const userMovies = useSelector((state) => state.UserMovies.userMovies);

  const searchValueChangeHandler = (text) => {
    dispatch(MoviesActions.clearSearchList());
    setSearchValue(text);
    dispatch(MoviesActions.searchMovies(text.trim()));
  };
  useEffect(() => {
    dispatch(MoviesActions.clearSearchList());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <SearchBar
        style={styles.searchbar}
        value={searchValue}
        onChangeText={searchValueChangeHandler}
        searchfunction={true}
        // onCancel={}
      />
      {!!searchValue && !!SearchList && searchValue.length > 2 ? (
        <FlatList
          scrollEnabled={scrollEnabled}
          keyExtractor={(item) => item.id}
          data={SearchList}
          renderItem={(itemData) => (
            <MovieListItem
              setScrollEnabled={(enabled) => setScrollEnabled(enabled)}
              movieTitle={itemData.item.title}
              posterUrl={itemData.item.posterUrl}
              year={itemData.item.year}
              onPress={() => {
                console.log("userMovies", userMovies);
                props.navigation.navigate({
                  name: "MoviesDetailScreen",
                  params: {
                    movieId: itemData.item.id,
                    movieTitle: itemData.item.title,
                    searched_movies: true,
                  },
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={{ ...styles.text, fontSize: 16 }}>
            {searchValue} not found
          </Text>
        </View>
      )}
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Search",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "apple-regular",
    fontSize: 12,
    color: Colors.lightblue,
  },
  searchbar: {
    marginTop: 5,
    width: "100%",
    shadowColor: "#000",
  },
});
export default SearchDetailScreen;
