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
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";

const MoviesScreen = (props) => {
  const trending_movies = useSelector((state) => state.Movies.movies);
  const new_releases = useSelector((state) => state.Movies.new_releases);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesAction.loadStories());
    dispatch(MoviesAction.loadNewReleases("dog"));
  }, [dispatch]);

  // const matchGenres = (genreId) => {};

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>New Releases</Text>
      </View>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
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
                  name: "NewReleasesModalScreen",
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

          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("SeeAllScreen");
            }}
          >
            <View style={{ flexDirection: "row", marginEnd: 15 }}>
              <Text style={styles.headerText}>see all</Text>
              <Ionicons name="ios-arrow-forward" size={25} color="#000" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
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
