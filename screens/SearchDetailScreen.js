import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

import SearchBar from "../components/SearchBar";

import MovieListItem from "../components/MovieListItem";

import * as MoviesActions from "../store/actions/MoviesAction";
import Colors from "../constants/Colors";
import { createSelector } from "reselect";

const searchlist = createSelector(
  (state) => state.Movies.searched_movies,
  (searched_movies) => searched_movies
);

const SearchDetailScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const SearchList = useSelector(searchlist);

  const dispatch = useDispatch();

  const searchValueChangeHandler = (text) => {
    dispatch(MoviesActions.clearSearchList());
    setSearchValue(text);
    dispatch(MoviesActions.searchMovies(text.trim()));
  };

  useEffect(() => {
    dispatch(MoviesActions.clearSearchList());
  }, [dispatch]);

  const renderListItem = ({ item }) => (
    <MovieListItem
      searchValue={searchValue.trim()}
      setScrollEnabled={(enabled) => setScrollEnabled(enabled)}
      movieTitle={item.title}
      posterUrl={item.posterUrl}
      year={item.year}
      onPress={() => {
        props.navigation.navigate({
          name: "MoviesDetailScreen",
          params: {
            movieId: item.id,
            movieTitle: item.title,
            searched_movies: true,
          },
        });
      }}
    />
  );

  return (
    <View style={styles.screen}>
      <SearchBar
        autoFocus={true}
        style={styles.searchbar}
        value={searchValue}
        onChangeText={searchValueChangeHandler}
        searchfunction={true}
        icon="circle-with-cross"
        cancelEnabled={!!searchValue.length > 0}
        clearSearchInput={() => setSearchValue("")}
        // onCancel={}
      />
      {!!searchValue && !!SearchList && searchValue.length > 2 ? (
        <FlatList
          scrollEnabled={scrollEnabled}
          keyExtractor={(item) => item.id}
          data={SearchList}
          renderItem={renderListItem}
        />
      ) : (
        <TouchableWithoutFeedback
          style={styles.centered}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {!!searchValue && (
              <Text style={{ ...styles.text, fontSize: 16 }}>
                {searchValue} not found
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
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
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "apple-regular",
    fontSize: 12,
    color: Colors.white,
  },
  searchbar: {
    marginHorizontal: 10,
    marginTop: 25,
    width: "95%",
    shadowColor: "#fff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SearchDetailScreen;
