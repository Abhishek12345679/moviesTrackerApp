import { SAVE_MOVIES } from "../actions/UserActions";
import Movie from "../../models/Movie";

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
        action.userMovie.year,
        // action.userMovie.cast,
        // action.userMovie.plot
      );
      console.log('saving...',savedMovie)
      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovie),
      };
    default:
      return state;
  }
};

export default UserMoviesReducer;
