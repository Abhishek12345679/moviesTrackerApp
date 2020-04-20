export const LOAD_MOVIES = "LOAD_MOVIES";

import Movie from "../../models/Movie";

import config from "../../config";

export const loadMovies = () => {
  return async (dispatch, getState) => {
    console.log(getState);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=Brooklyn`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log(resData);

      const loadedMovies = [];

      for (let i = 0; i < resData.Search.length; i++) {
        loadedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year
          )
        );
      }
      dispatch({ type: LOAD_MOVIES, movies: loadedMovies });
    } catch (err) {
      console.log(err);
    }
  };
};
