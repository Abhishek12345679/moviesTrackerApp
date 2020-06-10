import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import { useSelector } from "react-redux";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

const UserMoviesListScreen = (props) => {
  const location = props.route.params.loc;
  const title = props.route.params.title;

  const userMovies = useSelector((state) => state.UserMovies.userMovies);

  let movies = [];
  const selectedBoardMovies = userMovies.find(
    (board) => board.location === location
  );
  movies = movies.push(selectedBoardMovies);

  console.log(movies);

  const renderItem = ({ item }) => (
    <MovieItem
      style={{ width: 175, height: 175 }}
      id={item.key}
      movieTitle={item.title}
      posterUrl={item.posterUrl}
      year={item.year}
      ratings={item.ratings}
      // onPress={() => {
      //   props.navigation.navigate({
      //     name: "MoviesDetailScreen",
      //     params: {
      //       movieId: item.id,
      //       movieTitle: item.title,
      //       moviesType: movieType,
      //     },
      //   });
      // }}
    />
  );

  // const [isLoading, setIsLoading] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        numColumns={2}
        data={selectedBoardMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Text style={{ color: "#fff" }}>{selectedBoardMovies[0].title}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  flatlist: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const screenOptions = (navData) => {
  const headerTitle = title;
  return {
    headerTitle: headerTitle,
  };
};

export default UserMoviesListScreen;
