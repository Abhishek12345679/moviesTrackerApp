import {
  LOAD_MOVIES,
  SAVE_MOVIES_WATCHED,
  SAVE_MOVIES_WATCHING,
  SAVE_MOVIES_WILL_WATCH,
} from "../actions/UserActions";
import Movie from "../../models/Movie";

import { AsyncStorage } from "react-native";

const initialState = {
  userMovies: [],
  watched: [],
  currentlywatching: [],
  wanttowatch: [],
};

const UserMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MOVIES_WATCHED:
      const savedMovieWatched = new Movie(
        action.userMoviesWatched.id,
        action.userMoviesWatched.title,
        action.userMoviesWatched.posterUrl,
        action.userMoviesWatched.year
        // action.userMovie.cast,
        // action.userMovie.plot
      );
      console.log("saving...", savedMovieWatched);

      console.log(saveUserData(state.userMovies));

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovieWatched),
        watched: state.watched.concat(savedMovieWatched),
      };
    case SAVE_MOVIES_WATCHING:
      const savedMovieWatching = new Movie(
        action.userMoviesWatching.id,
        action.userMoviesWatching.title,
        action.userMoviesWatching.posterUrl,
        action.userMoviesWatching.year
        // action.userMovie.cast,
        // action.userMovie.plot
      );
      console.log("saving...", savedMovieWatching);

      console.log(saveUserData(state.userMovies));

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovieWatching),
        currentlywatching: state.currentlywatching.concat(savedMovieWatching),
      };
    case SAVE_MOVIES_WILL_WATCH:
      const savedMovieWillWatch = new Movie(
        action.userMoviesWillWatch.id,
        action.userMoviesWillWatch.title,
        action.userMoviesWillWatch.posterUrl,
        action.userMoviesWillWatch.year
        // action.userMovie.cast,
        // action.userMovie.plot
      );
      console.log("saving...", savedMovieWillWatch);

      console.log(saveUserData(state.userMovies));

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovieWillWatch),
        wanttowatch: state.wanttowatch.concat(savedMovieWillWatch),
      };
    case LOAD_MOVIES:
      return {
        ...state,
        userMovies: action.userMovies,
      };
    default:
      return state;
  }
};

const saveUserData = async (userMovies) => {
  try {
    await AsyncStorage.setItem(
      "UserData",
      JSON.stringify({
        userMovies: userMovies,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default UserMoviesReducer;
