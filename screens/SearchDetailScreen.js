import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";

import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as UserMoviesActions from "../store/actions/UserActions";

// import SearchBar from "../components/SearchBar";

import MovieListItem from "../components/MovieListItem";
// import SwipeableListItem from "../components/SwipeableListItem";

import * as MoviesActions from "../store/actions/MoviesAction";

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
        platform="defauv"
        value={searchValue}
        onChangeText={searchValueChangeHandler}
        // onCancel={}
      />
      {!!searchValue &&
      !!SearchList &&
      searchValue.length > 2 &&
      SearchList.length !== 0 ? (
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
                dispatch(
                  UserMoviesActions.saveMovies(
                    itemData.item.id,
                    itemData.item.title,
                    itemData.item.posterUrl,
                    itemData.item.year
                  )
                );
                console.log("userMovies", userMovies);
                props.navigation.navigate({
                  name: "MoviesDetailScreen",
                  params: {
                    movieId: itemData.item.id,
                    movieTitle: itemData.item.title,
                    searchScreen: true,
                  },
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.centered}>
          <Image
            style={{ width: 50, height: 50, color: "white" }}
            source={{
              uri: "https://png.pngtree.com/svg/20161014/nodata_800139.png",
            }}
          />

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
    backgroundColor: "#393e42",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "apple-regular",
    fontSize: 12,
    color: "#c2c2c2",
  },
});
export default SearchDetailScreen;
