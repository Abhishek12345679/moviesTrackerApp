export const LOAD_TRENDING_MOVIES = "LOAD_MOVIES";
export const LOAD_NEW_RELEASES = "LOAD_NEW_RELEASES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";

import Movie from "../../models/Movie";

import config from "../../config";

export const clearSearchList = () => {
  return { type: CLEAR_SEARCH_LIST };
};

export const loadTrendingMovies = () => {
  return async (dispatch) => {
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

      for (let i = 0; i < 10; i++) {
        loadedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year,
            resData.Search[i].Cast
          )
        );
      }
      dispatch({ type: LOAD_TRENDING_MOVIES, movies: loadedMovies });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadNewReleases = (MovieTitle) => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185/";
  return async (dispatch) => {
    try {
      // const response = await fetch(
      //   `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${MovieTitle}`
      // );
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/${"week"}?api_key=${
          config.TMDB_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log(resData);

      const loadedMovies = [];

      // for (let i = 0; i <= 2; i++) {
      //   loadedMovies.push(
      //     new Movie(
      //       resData.Search[i].imdbID,
      //       resData.Search[i].Title,
      //       resData.Search[i].Poster,
      //       resData.Search[i].Year
      //     )
      //   );
      // }

      for (let i = 0; i < 5; i++) {
        loadedMovies.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].media_type === "movie"
              ? resData.results[i].title
              : resData.results[i].name,
            posterBaseUrl + resData.results[i].poster_path,
            resData.results[i].media_type === "movie"
              ? resData.results[i].release_date
              : resData.results[i].first_air_date
          )
        );
      }

      dispatch({ type: LOAD_NEW_RELEASES, new_releases: loadedMovies });
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchMovies = (MovieTitle) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${MovieTitle}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log("search results: ", resData);

      // if (!!!resData.Search || resData.Search.length === 0) {
      //   fallbackText = "Search...";
      // } else if ((resData.Error = "Movie not found!")) {
      //   fallbackText = "No Movies with this name";
      // }

      const searchedMovies = [];

      let i;
      for (i = 0; i < resData.Search.length; i++) {
        searchedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year
          )
        );
      }
      dispatch({
        type: SEARCH_MOVIES,
        searched_movies: searchedMovies,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
