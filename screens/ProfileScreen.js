import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import * as UserActions from "../store/actions/UserActions";
import { useScrollToTop } from "@react-navigation/native";
import MovieItem from "../components/MovieItem";
import { createSelector } from "reselect";

const savedMovies = createSelector(
  (state) => state.UserMovies.userMovies,
  (userMovies) => userMovies
);
const watchedMovies = createSelector(
  (state) => state.UserMovies.userMovies,
  (userMovies) => userMovies.filter((movie) => movie.location === "WATCHED")
);

const watchingMovies = createSelector(
  (state) => state.UserMovies.userMovies,
  (userMovies) =>
    userMovies.filter((movie) => movie.location === "CURRENTLY_WATCHING")
);
const wantToWatchMovies = createSelector(
  (state) => state.UserMovies.userMovies,
  (userMovies) =>
    userMovies.filter((movie) => movie.location === "WANT_TO_WATCH")
);

const ProfileScreen = (props) => {
  const [clickedDP, setClickedDP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const saved_movies = useSelector(savedMovies);
  const watched_movies = useSelector(watchedMovies);

  // console.log("🌈", watched_movies);

  const watching_movies = useSelector(watchingMovies);
  const want_to_watch_movies = useSelector(wantToWatchMovies);

  const dispatch = useDispatch();
  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies().then(() => setRefreshing(false));
  }, [refreshing]);

  const fetchMovies = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(UserActions.loadMovies());
    } catch (err) {
      console.log(err);
    }

    setRefreshing(false);
  }, [dispatch, setRefreshing]);

  useEffect(() => {
    setLoading(true);
    fetchMovies().then(() => {
      setLoading(false);
    });
  }, [setLoading]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="small" color={Colors.lightblue} />
      </View>
    );
  }

  const renderMovieItem = ({ item }) => (
    <MovieItem
      posterUrl={item.posterUrl}
      movieTitle={item.title}
      year={item.year}
    />
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.lightblue}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.followers}>
          <Text style={styles.titleText}>Followers</Text>
          <Text style={styles.text}>420</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.profilepicture}
          onPress={() => setClickedDP((prevState) => !prevState)}
        >
          {clickedDP ? (
            <Image
              style={styles.dp}
              source={{
                uri:
                  "https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s150x150/94532354_240152954002694_3749616306081497088_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=PEqjbLghmN8AX9EKa6x&oh=e89db1a621feb1d6dcf13d63f69c20b9&oe=5ECEDAE3",
              }}
            />
          ) : (
            <AntDesign name="caretright" size={60} color="#FFF" />
          )}
        </TouchableOpacity>
        <View style={styles.followers}>
          <Text style={styles.titleText}>Following</Text>
          <Text style={styles.text}>69</Text>
        </View>
      </View>
      <View>
        <View>
          <View style={{ margin: 10 }}>
            <Text style={{ ...styles.titleText, fontSize: 20 }}>My Movies</Text>
          </View>

          <FlatList
            horizontal={true}
            scrollEnabled={true}
            data={saved_movies.reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderMovieItem}
          />

          <View>
            <View style={{ margin: 10 }}>
              <Text style={{ ...styles.titleText, fontSize: 20 }}>Watched</Text>
            </View>
          </View>

          <FlatList
            horizontal={true}
            scrollEnabled={true}
            data={watched_movies.reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderMovieItem}
          />
        </View>

        <View>
          <View style={{ margin: 10 }}>
            <Text style={{ ...styles.titleText, fontSize: 20 }}>
              Currently Watching
            </Text>
          </View>

          <FlatList
            horizontal={true}
            scrollEnabled={true}
            data={watching_movies.reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderMovieItem}
          />
        </View>
      </View>
      <View>
        <View style={{ margin: 10 }}>
          <Text style={{ ...styles.titleText, fontSize: 20 }}>
            Want to Watch
          </Text>
        </View>

        <FlatList
          horizontal={true}
          scrollEnabled={true}
          data={want_to_watch_movies.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderMovieItem}
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  dp: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  profilepicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: Colors.lightblue,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  titleText: {
    fontFamily: "apple-bold",
    fontSize: 15,
    color: Colors.white,
  },
  text: {
    fontFamily: "apple-bold",
    fontSize: 12,
    color: Colors.grey,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "tapforabhi",
  };
};

export default ProfileScreen;
