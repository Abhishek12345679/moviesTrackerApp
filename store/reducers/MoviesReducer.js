import {
  LOAD_STORIES,
  LOAD_NEW_RELEASES,
  SEARCH_MOVIES,
  CLEAR_SEARCH_LIST,
  LOAD_MOVIES_WITH_GENRES,
  CLEAR_GENRE_SCREEN,
} from "../actions/MoviesAction";

const initialState = {
  movies: [],
  userMovies: [],
  new_releases: [],
  searched_movies: [],
  moviesWRTGenre: [],
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GENRE_SCREEN:
      return {
        ...state,
        moviesWRTGenre: [],
      };
    case LOAD_STORIES:
      return {
        ...state,
        movies: action.movies,
      };
    case LOAD_NEW_RELEASES:
      return {
        ...state,
        new_releases: action.new_releases,
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        searched_movies: action.searched_movies,
      };
    case CLEAR_SEARCH_LIST:
      return {
        ...state,
        searched_movies: [],
      };
    case LOAD_MOVIES_WITH_GENRES:
      return {
        ...state,
        moviesWRTGenre: action.moviesWRTGenre,
      };
    default:
      return state;
  }
};

export default MoviesReducer;
