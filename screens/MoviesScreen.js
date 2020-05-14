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
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieItem from "../components/MovieItem";
import { useSelector, useDispatch } from "react-redux";
import * as MoviesAction from "../store/actions/MoviesAction";
import * as UserActions from "../store/actions/UserActions";
import Colors from "../constants/Colors";

import { useScrollToTop } from "@react-navigation/native";

import SkeletonContent from "react-native-skeleton-content";

const MoviesScreen = (props) => {
  const trending_movies = useSelector((state) => state.Movies.movies);
  // console.log("ON LAUNCH STORIES", trending_movies);
  const new_releases = useSelector((state) => state.Movies.new_releases);
  // console.log("ON LAUNCH NEW RELEASES", new_releases);
  const new_tv_shows = useSelector((state) => state.Movies.new_tv_shows);
  const anime = useSelector((state) => state.Movies.anime);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadScreen().then(() => setRefreshing(false));
  }, [refreshing]);

  const loadScreen = useCallback(async () => {
    try {
      await dispatch(MoviesAction.loadStories());
      await dispatch(MoviesAction.loadNewReleases());
      await dispatch(UserActions.loadMovies());
      await dispatch(MoviesAction.loadNewTVShows());
      await dispatch(MoviesAction.loadAnime());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadScreen().then(() => setLoading(false));
  }, [loadScreen, setLoading]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadScreen);
    return () => {
      unsubscribe();
    };
  }, [loadScreen]);

  // if (loading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="small" color={Colors.lightblue} />
  //     </View>
  //   );
  // }
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
        animationType="shiver"
        animationDirection="verticalDown"
        duration={2000}
        easing={Easing.linear}
        containerStyle={styles.headerCont}
        isLoading={loading || refreshing}
        layout={[
          {
            key: "text",
            width: 200,
            height: 30,
            marginHorizontal: 10,
            marginVertical: 2,
          },
        ]}
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
          data={trending_movies}
          renderItem={(itemData) => (
            <SkeletonContent
              boneColor="#303030"
              highlightColor="#252525"
              animationType="shiver"
              animationDirection="verticalDown"
              duration={2000}
              easing={Easing.linear}
              containerStyle={{
                flex: 1,
                width: 80,
                height: 80,
                marginHorizontal: 10,
                marginVertical: 7.5,
                borderRadius: 40,
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
                  borderWidth: 2,
                  borderColor: Colors.lightblue,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                footerStyle={{
                  opacity: 0,
                }}
                imageStyle={{
                  width: 65,
                  height: 65,
                  borderRadius: 65 / 2,
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
            </SkeletonContent>
          )}
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
          animationType="shiver"
          animationDirection="verticalDown"
          duration={2000}
          easing={Easing.linear}
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[
            {
              key: "text",
              width: 250,
              height: 30,
              marginHorizontal: 10,
              marginVertical: 10,
            },
          ]}
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
                <Text style={styles.headerText}> Trending </Text>
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
          renderItem={(itemData) => (
            <SkeletonContent
              boneColor="#303030"
              highlightColor="#252525"
              animationType="shiver"
              animationDirection="verticalDown"
              duration={2000}
              easing={Easing.linear}
              containerStyle={styles.new_releases}
              isLoading={loading || refreshing}
              layout={[
                {
                  key: "story",
                  width: 200,
                  height: 150,
                  borderRadius: 5,
                  marginStart: 10,
                  marginVertical: 5,
                },
              ]}
            >
              <MovieItem
                style={styles.new_releases}
                id={itemData.item.id}
                movieTitle={itemData.item.title}
                posterUrl={itemData.item.posterUrl}
                year={itemData.item.year}
                onPress={() => {
                  props.navigation.navigate({
                    name: "MoviesDetailScreen",
                    params: {
                      movieId: itemData.item.id,
                      movieTitle: itemData.item.title,
                      moviesType: "Movies",
                    },
                  });
                }}
              />
            </SkeletonContent>
          )}
        />
      </View>

      {/* TV SHOWS */}

      <View>
        <SkeletonContent
          boneColor="#303030"
          containerStyle={styles.headerCont}
          highlightColor="#252525"
          animationType="shiver"
          animationDirection="verticalDown"
          duration={2000}
          easing={Easing.linear}
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[
            {
              key: "text",
              width: 250,
              height: 30,
              marginHorizontal: 10,
              marginVertical: 10,
            },
          ]}
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
                <Text style={styles.headerText}> TV Shows </Text>
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
          renderItem={(itemData) => (
            <SkeletonContent
              boneColor="#303030"
              highlightColor="#252525"
              animationType="shiver"
              animationDirection="horizontalRight"
              easing={Easing.linear}
              duration={500}
              containerStyle={styles.new_releases}
              isLoading={loading || refreshing}
              layout={[
                {
                  key: "story",
                  width: 200,
                  height: 150,
                  borderRadius: 5,
                  marginStart: 10,
                  marginVertical: 5,
                },
              ]}
            >
              <MovieItem
                style={styles.new_releases}
                id={itemData.item.id}
                movieTitle={itemData.item.title}
                posterUrl={itemData.item.posterUrl}
                year={itemData.item.year}
                onPress={() => {
                  props.navigation.navigate({
                    name: "MoviesDetailScreen",
                    params: {
                      movieId: itemData.item.id,
                      movieTitle: itemData.item.title,
                      moviesType: "TV",
                    },
                  });
                }}
              />
            </SkeletonContent>
          )}
        />
      </View>

      {/* Anime */}

      <View>
        <SkeletonContent
          boneColor="#303030"
          containerStyle={styles.headerCont}
          highlightColor="#252525"
          animationType="shiver"
          animationDirection="verticalDown"
          duration={2000}
          easing={Easing.linear}
          containerStyle={styles.headerCont}
          isLoading={loading || refreshing}
          layout={[
            {
              key: "text",
              width: 250,
              height: 30,
              marginHorizontal: 10,
              marginVertical: 10,
            },
          ]}
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
          renderItem={(itemData) => (
            <SkeletonContent
              boneColor="#303030"
              highlightColor="#252525"
              animationType="shiver"
              animationDirection="horizontalRight"
              easing={Easing.linear}
              duration={500}
              containerStyle={styles.new_releases}
              isLoading={loading || refreshing}
              layout={[
                {
                  key: "story",
                  width: 200,
                  height: 150,
                  borderRadius: 5,
                  marginStart: 10,
                  marginVertical: 5,
                },
              ]}
            >
              <MovieItem
                style={styles.new_releases}
                id={itemData.item.id}
                movieTitle={itemData.item.title}
                posterUrl={itemData.item.posterUrl}
                year={itemData.item.year}
                onPress={() => {
                  props.navigation.navigate({
                    name: "MoviesDetailScreen",
                    params: {
                      movieId: itemData.item.id,
                      movieTitle: itemData.item.title,
                      moviesType: "anime",
                      goToAnime: true,
                    },
                  });
                }}
              />
            </SkeletonContent>
          )}
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
  new_releases: {
    flex: 1,
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
});

export default MoviesScreen;
