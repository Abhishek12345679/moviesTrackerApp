import { SAVE_MOVIES, LOAD_MOVIES } from "../actions/UserActions";
import Movie from "../../models/Movie";

const initialState = {
  userMovies: [],
  watched: [],
  currently_watching: [],
  want_to_watch: [],
};

const UserMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MOVIES:
      const savedMovie = new Movie(
        action.userMovie.id,
        action.userMovie.title,
        action.userMovie.posterUrl,
        action.userMovie.year,
        "",
        "",
        "",
        "",
        action.userMovie.location
      );
      console.log("saving...", savedMovie);

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovie),
      };
    case LOAD_MOVIES:
      return {
        ...state,
        userMovies: action.userMovies,
        watched: action.watched,
        currently_watching: action.currently_watching,
        want_to_watch: action.want_to_watch,
      };
    default:
      return state;
  }
};

export default UserMoviesReducer;
