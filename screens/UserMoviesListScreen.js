import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";

import MovieItem from "../components/MovieItem";
import Colors from "../constants/Colors";

const UserMoviesListScreen = (props) => {
  // const location =

  const renderItem = ({ item }) => (
    <MovieItem
      style={{ width: 175, height: 175 }}
      id={item.id}
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
        // data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.headerTitle;
  return {
    headerTitle: headerTitle,
  };
};

export default UserMoviesListScreen;
