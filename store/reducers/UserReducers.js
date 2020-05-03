import { SAVE_MOVIES, LOAD_MOVIES } from "../actions/UserActions";
import Movie from "../../models/Movie";

import { AsyncStorage } from "react-native";

const initialState = {
  userMovies: [],
};

const UserMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MOVIES:
      const savedMovie = new Movie(
        action.userMovie.id,
        action.userMovie.title,
        action.userMovie.posterUrl,
        action.userMovie.year
        // action.userMovie.cast,
        // action.userMovie.plot
      );
      console.log("saving...", savedMovie);

      console.log(saveUserData(state.userMovies));

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovie),
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
