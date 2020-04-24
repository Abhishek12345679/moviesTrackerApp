import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";

const MoviesScreen = (props) => {
  const trending_movies = useSelector((state) => state.Movies.movies);
  const new_releases = useSelector((state) => state.Movies.new_releases);
  const searched_movies = useSelector((state) => state.Movies.searched_movies);

  // console.log("trending movies : ", trending_movies);
  // console.log("new movies : ", new_releases);
  // console.log("searched movies : ", searched_movies);

  const dispatch = useDispatch();

  const genres = [
    { id: 9648, genreName: "Mystery", genreColor: "#1abc9c" },
    { id: 27, genreName: "Horror", genreColor: "#34495e" },
    { id: 18, genreName: "Drama", genreColor: "#2980b9" },
    { id: 16, genreName: "Anime", genreColor: "#d35400" },
  ];

  useEffect(() => {
    dispatch(MoviesAction.loadStories());
    dispatch(MoviesAction.loadNewReleases("dog"));
  }, [dispatch]);

  // const matchGenres = (genreId) => {};

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>Stories</Text>

        <View style={{ flexDirection: "row", marginEnd: 15 }}>
          <Text style={styles.headerText}>see all</Text>
          <Ionicons name="ios-arrow-forward" size={25} color="#000" />
        </View>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={trending_movies}
          renderItem={(itemData) => (
            <MovieItem
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                borderWidth: 2.3,
                borderColor: "green",
              }}
              imageStyle={{ width: 90, height: 90, borderRadius: 45 }}
              id={itemData.item.id}
              // movieTitle={itemData.item.title}
              posterUrl={itemData.item.posterUrl}
              // year={itemData.item.year}
              onPress={() => {
                props.navigation.navigate({
                  name: "MoviesDetailScreen",
                  params: {
                    movieTitle: itemData.item.title,
                    posterUrl: itemData.item.posterUrl,
                    movieId: itemData.item.id,
                  },
                });
              }}
            />
          )}
        />
      </View>
      <View>
        <View style={styles.headerCont}>
          <Text style={styles.headerText}>Trending</Text>

          <View style={{ flexDirection: "row", marginEnd: 15 }}>
            <Text style={styles.headerText}>see all</Text>
            <Ionicons name="ios-arrow-forward" size={25} color="#000" />
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={new_releases}
          renderItem={(itemData) => (
            <MovieItem
              style={styles.new_releases}
              id={itemData.item.id}
              movieTitle={itemData.item.title}
              posterUrl={itemData.item.posterUrl}
              year={itemData.item.year}
              onPress={() => {
                // props.navigation.navigate({
                //   name: "MoviesWRTGenreDetailScreen",
                //   params: {
                //     movieTitle: itemData.item.title,
                //     posterUrl: itemData.item.posterUrl,
                //     movieId: itemData.item.id,
                //     //   itemData: itemData,
                //   },
                // });
              }}
            />
          )}
        />
      </View>

      <View>
        <View style={styles.headerCont}>
          <Text style={styles.headerText}>Genre</Text>

          <View style={{ flexDirection: "row", marginEnd: 15 }}>
            <Text style={styles.headerText}>see all</Text>
            <Ionicons name="ios-arrow-forward" size={25} color="#000" />
          </View>
        </View>
        <FlatList
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
              style={{
                ...styles.genreTab,
                backgroundColor: itemData.item.genreColor,
              }}
            >
              <Text style={{ ...styles.headerText, fontSize: 17 }}>
                {itemData.item.genreName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export const screenOptions = {
  headerTitle: "Moveey",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems:'center',
    // justifyContent:'center'
  },
  headerCont: {
    width: "100%",
    marginStart: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "apple-regular",
    fontSize: 20,
    marginEnd: 5,
  },
  new_releases: {
    flex: 1,
    width: Dimensions.get("window").width - 50,
  },
  genreTab: {
    marginVertical: 10,
    marginHorizontal: 15,
    width: 160,
    height: 100,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});

export default MoviesScreen;
