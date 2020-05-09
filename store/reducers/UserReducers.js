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
        action.userMovie.cast,
        // action.userMovie.plot,
        action.userMovie.ratings,
        action.userMovie.language,
        action.userMovie.location
      );
      console.log("saving...", savedMovie);

      // console.log(saveUserData(state.userMovies));

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovie),
        watched:state.watched.concat(savedMovie)
      };
    case LOAD_MOVIES:
      return {
        ...state,
        userMovies: action.userMovies,
        watched: action.userMovies.filter(
          (movie) => movie.location === "ALREADY_WATCHED"
        ),
        currently_watching: action.userMovies.filter(
          (movie) => movie.location === "CURRENTLY_WATCHING"
        ),
        want_to_watch: action.userMovies.filter(
          (movie) => movie.location === "WANT_TO_WATCH"
        ),
      };
    default:
      return state;
  }
};

export default UserMoviesReducer;
