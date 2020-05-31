import {
  SAVE_MOVIES,
  LOAD_MOVIES,
  ADD_STORY,
  LOAD_STORY,
} from "../actions/UserActions";

import Movie from "../../models/Movie";
import Story from "../../models/Story";

const initialState = {
  userMovies: [],
  watched: [],
  currently_watching: [],
  want_to_watch: [],
  stories: [],
};

const UserMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORY:
      const newStory = new Story(
        action.userStories.id,
        action.userStories.title,
        action.userStories.genres,
        action.userStories.language,
        action.userStories.movieLink
      );
      return {
        ...state,
        stories: state.stories.concat(newStory),
      };
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
      //   console.log("saving...", savedMovie);

      return {
        ...state,
        userMovies: state.userMovies.concat(savedMovie),
      };
    case LOAD_MOVIES:
      return {
        ...state,
        userMovies: action.userMovies,
      };
    case LOAD_STORY:
      return {
        ...state,
        stories: action.userStories,
      };
    default:
      return state;
  }
};

export default UserMoviesReducer;
