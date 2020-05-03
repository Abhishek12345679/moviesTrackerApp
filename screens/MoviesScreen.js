import React, { useEffect, useCallback } from "react";
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
import * as UserActions from "../store/actions/UserActions";
import Colors from "../constants/Colors";

const MoviesScreen = (props) => {
  const trending_movies = useSelector((state) => state.Movies.movies);
  const new_releases = useSelector((state) => state.Movies.new_releases);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesAction.loadStories());
    dispatch(MoviesAction.loadNewReleases());
  }, [dispatch]);

  const fetchMovies = useCallback(async () => {
    // setLoading(true);
    try {
      await dispatch(UserActions.loadMovies());
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  }, [
    dispatch, //setLoading
  ]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      {/* new releases stories */}
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
                width: 80,
                height: 80,
                borderRadius: 40,
                shadowColor: Colors.white,
                shadowOpacity: 0,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}
              footerStyle={{
                opacity: 0,
              }}
              imageStyle={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: Colors.lightblue,
              }}
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
      {/* new releases stories */}

      {/*...

       TOP MOVIE THAT WEEK 
       
       ...
       */}

      <View>
        <View style={styles.headerCont}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("SeeAllScreen");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.headerText}>Trending</Text>

              <Ionicons
                style={{ marginStart: 5 }}
                name="ios-arrow-forward"
                size={22}
                color={Colors.lightblue}
              />
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
              onPress={() => {}}
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
    backgroundColor: Colors.primaryColor,
  },
  headerCont: {
    width: "100%",
    marginStart: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.lightblue,
    fontFamily: "apple-bold",
    fontSize: 17,
    marginEnd: 5,
  },
  new_releases: {
    flex: 1,
    width: 200,
    height: 150,
  },
});

export default MoviesScreen;
