import { LOAD_MOVIES } from "../actions/MoviesAction";

const initialState = {
  movies: [],
  userMovies: [],
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    default:
      return state;
  }
};

export default MoviesReducer;
