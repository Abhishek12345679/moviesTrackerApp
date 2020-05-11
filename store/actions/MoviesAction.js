export const LOAD_STORIES = "LOAD_STORIES";
export const LOAD_NEW_RELEASES = "LOAD_NEW_RELEASES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";
export const LOAD_MOVIES_WITH_GENRES = "LOAD_MOVIES_WITH_GENRES";
export const CLEAR_GENRE_SCREEN = "CLEAR_GENRE_SCREEN";

import Movie from "../../models/Movie";

import config from "../../config";
import Cast from "../../models/CastMember";

export const clearSearchList = () => {
  return { type: CLEAR_SEARCH_LIST };
};

export const clearGenreScreen = () => {
  return {
    type: CLEAR_GENRE_SCREEN,
  };
};

export const loadStories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=sex`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log("NEW RELEASES", resData);

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
      console.log("STORIES", getState());
      dispatch({ type: LOAD_STORIES, movies: loadedMovies });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadNewReleases = () => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  let hasUserSaved;
  return async (dispatch, getState) => {
    // console.log("🌈🌈", getState());

    // if()
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${config.TMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log(resData);

      const getCredits = async (index) => {
        let response, creditsData;
        try {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/${resData.results[index].id}?api_key=${config.TMDB_API_KEY}&language=en-US&append_to_response=credits`
          );
          creditsData = await response.json();
          // console.log("credits", creditsData);
        } catch (err) {
          throw new Error(err);
        }

        const castMembers = [];

        for (let i = 0; i < 5; i++) {
          castMembers.push(
            new Cast(
              creditsData.credits.cast[i].id,
              creditsData.credits.cast[i].character,
              creditsData.credits.cast[i].name,
              posterBaseUrl + creditsData.credits.cast[i].profile_path
            )
          );
        }

        console.log(castMembers);

        return castMembers;
      };

      const LoadedNewReleases = [];

      for (let i = 0; i <= 5; i++) {
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.results[i].id.toString()
        );
        LoadedNewReleases.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].media_type === "movie"
              ? resData.results[i].title
              : resData.results[i].name,
            posterBaseUrl + resData.results[i].poster_path,
            resData.results[i].media_type === "movie"
              ? resData.results[i].release_date
              : resData.results[i].first_air_date,
            getCredits(i),
            resData.results[i].overview,
            resData.results[i].vote_average,
            "",
            hasUserSaved ? hasUserSaved.location : ""
          )
        );
      }

      dispatch({ type: LOAD_NEW_RELEASES, new_releases: LoadedNewReleases });
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchMovies = (MovieTitle) => {
  let response;
  let hasUserSaved;
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  return async (dispatch, getState) => {
    try {
      response = await fetch(
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${MovieTitle}&plot=full`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log("search results: ", resData);

      const getCredits = async (index) => {
        let response, creditsData;
        try {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/${resData.Search[index].imdbID}?api_key=${config.TMDB_API_KEY}&language=en-US&append_to_response=credits`
          );
          creditsData = await response.json();
          console.log("credits", creditsData);
        } catch (err) {
          throw new Error(err);
        }

        const castMembers = [];

        let cast_limit = creditsData.credits.cast.length;

        if (cast_limit < 5) {
          cast_limit = creditsData.credits.cast.length;
        } else if (cast_limit === 5) {
          cast_limit = 5;
        } else {
          cast_limit = 5;
        }

        let j;
        for (j = 0; j < cast_limit; j++) {
          castMembers.push(
            new Cast(
              creditsData.credits.cast[j].id,
              creditsData.credits.cast[j].character,
              creditsData.credits.cast[j].name,
              posterBaseUrl + creditsData.credits.cast[j].profile_path
            )
          );
        }

        console.log(castMembers);

        return castMembers;
      };

      const searchedMovies = [];

      let i;
      let limit = resData.Search.length;

      if (limit < 10) {
        limit = resData.Search.length;
      } else if (limit === 10) {
        limit = 10;
      } else {
        limit = 10;
      }

      for (i = 0; i < limit; i++) {
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.Search[i].imdbID
        );
        searchedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year,
            getCredits(i),
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, numquam cupiditate obcaecati commodi dolores veritatis nam ad consequatur laudantium provident nobis dolore maiores dicta voluptas exercitationem soluta dolorem. Ullam, totam.",
            "",
            "",
            hasUserSaved ? hasUserSaved.location : ""
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

export const loadMoviesWithGenres = (genreId) => {
  let response;
  let hasUserSaved;
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  return async (dispatch, getState) => {
    dispatch(clearGenreScreen());
    try {
      response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${config.TMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log(resData);

      const getCredits = async (index) => {
        let response, creditsData;
        try {
          response = await fetch(
            `https://api.themoviedb.org/3/movie/${resData.results[index].id}?api_key=${config.TMDB_API_KEY}&language=en-US&append_to_response=credits`
          );
          creditsData = await response.json();
          // console.log("credits", creditsData);
        } catch (err) {
          console.log(err);
        }

        const castMembers = [];

        for (let i = 0; i < 5; i++) {
          castMembers.push(
            new Cast(
              creditsData.credits.cast[i].id,
              creditsData.credits.cast[i].character,
              creditsData.credits.cast[i].name,
              posterBaseUrl + creditsData.credits.cast[i].profile_path
            )
          );
        }

        console.log(castMembers);

        return castMembers;
      };

      // console.log("CAST 👨‍👨‍👧‍👦", getCredits());

      const loadedMoviesWRTGenre = [];

      for (let i = 0; i <= 5; i++) {
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.results[i].id.toString()
        );
        loadedMoviesWRTGenre.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].title,
            posterBaseUrl + resData.results[i].poster_path,
            resData.results[i].release_date,
            getCredits(i),
            resData.results[i].overview,
            resData.results[i].vote_average,
            resData.results[i].original_language,
            hasUserSaved ? hasUserSaved.location : ""
          )
        );
      }

      console.log("moviesWRTGenre", loadedMoviesWRTGenre);

      dispatch({
        type: LOAD_MOVIES_WITH_GENRES,
        moviesWRTGenre: loadedMoviesWRTGenre,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
