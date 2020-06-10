import {
  SAVE_MOVIES,
  LOAD_MOVIES,
  ADD_STORY,
  LOAD_STORY,
  ADD_BOARD,
  LOAD_BOARDS,
} from "../actions/UserActions";

import Movie from "../../models/Movie";
import Story from "../../models/Story";
import Board from "../../models/Board";

const initialState = {
  userMovies: [],
  watched: [],
  currently_watching: [],
  want_to_watch: [],
  stories: [],
  boards: [
    { key: 1, loc: "WATCHED", title: "watched" },
    { key: 2, loc: "CURRENTLY_WATCHING", title: "currently watching" },
    { key: 3, loc: "WANT_TO_WATCH", title: "want to watch" },
  ],
};

const UserMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      const newBoard = new Board(
        action.boardData.key,
        action.boardData.loc,
        action.boardData.title
      );

      return {
        ...state,
        boards: state.boards.concat(newBoard),
      };
    case LOAD_BOARDS:
      return {
        ...state,
        boards: state.boards.concat(action.userBoards),
        // boards: [...state.boards, ...action.userBoards],
      };
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
