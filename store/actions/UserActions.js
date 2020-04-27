export const SAVE_MOVIES = "SAVE_MOVIES";

import Movie from "../../models/Movie";

export const saveMovies = (id, title, posterUrl, year) => {
  return {
    type: SAVE_MOVIES,
    userMovie: {
      id,
      title,
      posterUrl,
      year,
    },
  };
};
