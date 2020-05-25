/**
 * Move the onPress outside
 */

import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";
import * as UserActions from "../store/actions/UserActions";
import Colors from "../constants/Colors";

import { useScrollToTop } from "@react-navigation/native";

import SkeletonContent from "react-native-skeleton-content";
import { createSelector } from "reselect";

const stories = createSelector(
  (state) => state.Movies.movies,
  (movies) => movies
);
const newReleases = createSelector(
  (state) => state.Movies.new_releases,
  (new_releases) => new_releases
);
const newTVShows = createSelector(
  (state) => state.Movies.new_tv_shows,
  (new_tv_shows) => new_tv_shows
);
const Anime = createSelector(
  (state) => state.Movies.anime,
  (anime) => anime
);

const MoviesScreen = (props) => {
  const Stories = useSelector(stories);
  const new_releases = useSelector(newReleases);

  console.log("movie screen rendered");

  const new_tv_shows = useSelector(newTVShows);
  const anime = useSelector(Anime);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadScreen();
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  }, []);

  const loadScreen = useCallback(async () => {
    try {
      await dispatch(MoviesAction.loadAll());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadScreen().then(() => setLoading(false));
  }, []);

  const renderTrendingMoviesItem = ({ item }) => (
    <SkeletonContent
      boneColor="#303030"
      highlightColor="#252525"
      containerStyle={styles.new_releases}
      isLoading={loading || refreshing}
      layout={{ width: 100, height: 100, key: "abc" }}
    >
      <MovieItem
        style={styles.new_releases}
        id={item.id}
        movieTitle={item.title}
        posterUrl={item.posterUrl}
        year={item.year}
        onPress={() => {
          props.navigation.navigate({
            name: "MoviesDetailScreen",
            params: {
              movieId: item.id,
              movieTitle: item.title,
              moviesType: "Movies",
            },
          });
        }}
      />
    </SkeletonContent>
  );

  const renderStoriesItem = ({ item }) => (
    <SkeletonContent
      boneColor="#303030"
      highlightColor="#252525"
      containerStyle={{
        ...styles.storyItem,
        marginHorizontal: 10,
        marginVertical: 7.5,
      }}
      isLoading={loading || refreshing}
      layout={[
        {
          key: "story",
          width: 80,
          height: 80,
          borderRadius: 40,
          marginHorizontal: 10,
          marginVertical: 7.5,
        },
      ]}
    >
      <MovieItem
        style={styles.storyItem}
        footerStyle={{ opacity: 0 }}
        imageStyle={styles.storyImage}
        id={item.id}
        posterUrl={item.posterUrl}
        onPress={() => {
          props.navigation.navigate({
            name: "NewReleasesModalScreen",
            params: {
              movieTitle: item.title,
              posterUrl: item.posterUrl,
              movieId: item.id,
            },
          });
        }}
      />
    </SkeletonContent>
  );

  const renderTrendingTVItem = ({ item }) => (
    <SkeletonContent
      boneColor="#303030"
      highlightColor="#252525"
      containerStyle={styles.new_releases}
      isLoading={loading || refreshing}
      layout={[styles.cinemaSkeleton]}
    >
      <MovieItem
        style={styles.new_releases}
        id={item.id}
        movieTitle={item.title}
        posterUrl={item.posterUrl}
        year={item.year}
        onPress={() => {
          props.navigation.navigate({
            name: "MoviesDetailScreen",
            params: {
              movieId: item.id,
              movieTitle: item.title,
              moviesType: "TV",
            },
          });
        }}
      />
    </SkeletonContent>
  );

  const renderAnimeItem = ({ item }) => (
    <SkeletonContent
      boneColor="#303030"
      highlightColor="#252525"
      containerStyle={styles.new_releases}
      isLoading={loading || refreshing}
      layout={[styles.cinemaSkeleton]}
    >
      <MovieItem
        style={styles.new_releases}
        id={item.id}
        movieTitle={item.title}
        posterUrl={item.posterUrl}
        year={item.year}
        onPress={() => {
          props.navigation.navigate({
            name: "MoviesDetailScreen",
            params: {
              movieId: item.id,
              movieTitle: item.title,
              moviesType: "anime",
              goToAnime: true,
            },
          });
        }}
      />
    </SkeletonContent>
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.lightblue}
        />
      }
    >
      {/* new releases stories */}
      <StatusBar barStyle="light-content" />
      <SkeletonContent
        boneColor="#303030"
        highlightColor="#252525"
        containerStyle={styles.headerCont}
        isLoading={loading || refreshing}
        layout={[styles.headerTextSkeleton]}
      >
        <View style={styles.headerCont}>
          <Text style={styles.headerText}> New Releases </Text>
        </View>
      </SkeletonContent>
      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={Stories}
          renderItem={renderStoriesItem}
        />
      </View>

      {/* new releases stories */}
      {/*...

      TOP MOVIE THAT WEEK 
      
      ...
      */}

      <View>
        <SkeletonContent
          boneColor="#303030"
          containerStyle={styles.headerCont}
          highlightColor="#252525"
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[styles.headerTextSkeleton]}
        >
          <View style={styles.headerCont}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate({
                  name: "SeeAllScreen",
                  params: {
                    new_releases: true,
                    headerTitle: "Trending Movies",
                  },
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerText}>Trending Movies</Text>
                <Ionicons
                  style={{ marginStart: 5 }}
                  name="ios-arrow-forward"
                  size={22}
                  color={Colors.lightblue}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SkeletonContent>
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={new_releases}
          renderItem={renderTrendingMoviesItem}
        />
      </View>

      {/* TV SHOWS */}

      <View>
        <SkeletonContent
          boneColor="#303030"
          containerStyle={styles.headerCont}
          highlightColor="#252525"
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[styles.headerTextSkeleton]}
        >
          <View style={styles.headerCont}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate({
                  name: "SeeAllScreen",
                  params: {
                    new_tv_shows: true,
                    headerTitle: "Trending TV Shows",
                  },
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerText}>Trending TV</Text>
                <Ionicons
                  style={{ marginStart: 5 }}
                  name="ios-arrow-forward"
                  size={22}
                  color={Colors.lightblue}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SkeletonContent>
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={new_tv_shows}
          renderItem={renderTrendingTVItem}
        />
      </View>

      {/* Anime */}

      <View>
        <SkeletonContent
          boneColor="#303030"
          containerStyle={styles.headerCont}
          highlightColor="#252525"
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[styles.headerTextSkeleton]}
        >
          <View style={styles.headerCont}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate({
                  name: "SeeAllScreen",
                  params: {
                    moviesType: "anime",
                    goToAnime: true,
                    headerTitle: "Trending Anime",
                  },
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerText}> Anime </Text>
                <Ionicons
                  style={{ marginStart: 5 }}
                  name="ios-arrow-forward"
                  size={22}
                  color={Colors.lightblue}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SkeletonContent>
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={anime}
          renderItem={renderAnimeItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  headerCont: {
    width: "100%",
    marginStart: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.lightblue,
    fontFamily: "apple-bold",
    fontSize: 17,
    marginEnd: 5,
  },
  storyItem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: Colors.white,
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderWidth: 2,
    borderColor: Colors.lightblue,
    alignItems: "center",
    justifyContent: "center",
  },
  storyImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
  },
  new_releases: {
    // flex: 1,
    width: 200,
    height: 125,
    marginHorizontal: 7.5,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  cinemaSkeleton: {
    width: 200,
    height: 150,
    borderRadius: 5,
    marginStart: 10,
    marginVertical: 5,
  },
  headerTextSkeleton: {
    width: 250,
    height: 30,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default MoviesScreen;
