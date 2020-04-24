import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

// import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../components/SearchBar";

import MovieListItem from "../components/MovieListItem";

import * as MoviesActions from "../store/actions/MoviesAction";

const SearchScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const SearchList = useSelector((state) => state.Movies.searched_movies);

  const dispatch = useDispatch();

  const searchValueChangeHandler = (text) => {
    dispatch(MoviesActions.clearSearchList());
    setSearchValue(text);
    dispatch(MoviesActions.searchMovies(text.trim()));
  };
  useEffect(() => {
    dispatch(MoviesActions.clearSearchList());
  }, [dispatch]);

  return (
    <ScrollView style={styles.screen}>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                "https://images.pexels.com/photos/2398354/pexels-photo-2398354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            }}
          />
        </View>
        <View>
          <SearchBar
            placeholder="Type here..."
            value={searchValue}
            onChangeText={searchValueChangeHandler}
            platform="ios"
            onCancel={() => dispatch(MoviesActions.clearSearchList())}
            onSubmitEditing={() => {
              dispatch(MoviesActions.searchMovies(searchValue));
            }}
          />
        </View>
        <View style={{ flex: 1, marginTop: 20, backgroundColor: "#fff" }}>
          {!!SearchList && searchValue.length > 2 && SearchList.length !== 0 ? (
            <FlatList
              style={{ flexGrow: 1 }}
              keyExtractor={(item) => item.id}
              data={SearchList}
              renderItem={(itemData) => (
                <MovieListItem
                  movieTitle={itemData.item.title}
                  onPress={() =>
                    props.navigation.navigate({
                      name: "MoviesDetailScreen",
                      params: {
                        movieId: itemData.item.id,
                        movieTitle: itemData.item.title,
                        searchScreen: true,
                      },
                    })
                  }
                />
              )}
            />
          ) : (
            <View style={styles.centered}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: "https://png.pngtree.com/svg/20161014/nodata_800139.png",
                }}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = {
  headerTitle: "Search",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
