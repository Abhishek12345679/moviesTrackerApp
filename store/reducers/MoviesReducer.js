import {
  LOAD_TRENDING_MOVIES,
  LOAD_NEW_RELEASES,
  SEARCH_MOVIES,
  CLEAR_SEARCH_LIST,
} from "../actions/MoviesAction";

const initialState = {
  movies: [],
  userMovies: [],
  new_releases: [],
  searched_movies: [],
  searchListState:''
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRENDING_MOVIES:
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
    default:
      return state;
  }
};

export default MoviesReducer;
