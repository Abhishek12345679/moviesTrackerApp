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
  ActivityIndicator,
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
        animationType="pulse"
        animationDirection="horizontalRight"
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
              animationDirection="horizontalRight"
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
          animationDirection="horizontalRight"
          easing={Easing.linear}
          duration={1000}
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
                props.navigation.navigate("SeeAllScreen");
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
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={new_releases}
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
                      new_releases: true,
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
    height: 160,
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
