export const LOAD_STORIES = "LOAD_STORIES";
export const LOAD_NEW_RELEASES = "LOAD_NEW_RELEASES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";
export const LOAD_MOVIES_WITH_GENRES = "LOAD_MOVIES_WITH_GENRES";
export const CLEAR_GENRE_SCREEN = "CLEAR_GENRE_SCREEN";
export const LOAD_NEW_TV_SHOWS = "LOAD_NEW_TV_SHOWS";
export const LOAD_ANIME = "LOAD_ANIME";

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
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=first`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      // console.log("NEW RELEASES", resData);

      const loadedMovies = [];
      const length = resData.Search.length;

      for (let i = 0; i < length; i++) {
        loadedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year
          )
        );
      }
      // console.log("STORIES", getState());
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
        const length =
          creditsData.credits.cast.length > 10
            ? 10
            : creditsData.credits.cast.length;

        for (let i = 0; i < length; i++) {
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

        return { cast: castMembers };
      };

      const LoadedNewReleases = [];
      const length = resData.results.length;

      for (let i = 0; i < length; i++) {
        // let credits;
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.results[i].id.toString()
        );

        // let promises = [];
        // for (let i = 0; i < creditsData.credits.cast.length; i++) {
        //   promises.push(getCredits(index));
        // }

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
             getCredits(i)
              .then((results) => {
                console.log("success", results.cast);
                return results.cast;
              })
              .catch((err) => console.log("cast error", err)),
            // Promise.all(promises).then((results) => {
            //   for (let i = 0; i < results.length; i++) {
            //     results[i].cast;
            //   }
            // }),
            // cast,
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

export const loadNewTVShows = () => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  let hasUserSaved;
  return async (dispatch, getState) => {
    // console.log("🌈🌈", getState());
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${config.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&first_air_date_year=2020&page=1&with_original_language=en`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      // console.log(resData);

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
        const length =
          creditsData.credits.cast.length > 10
            ? 10
            : creditsData.credits.cast.length;

        for (let i = 0; i < length; i++) {
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

        return { cast: castMembers };
      };

      const loadedNewTVShows = [];
      const length = resData.results.length;

      for (let i = 0; i < length; i++) {
        // let credits;
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.results[i].id.toString()
        );
        // let cast = getCredits(i).then((cast) => cast);
        // console.log("CAST", cast);
        loadedNewTVShows.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].name,
            posterBaseUrl + resData.results[i].poster_path,
            resData.results[i].first_air_date.toString().substr(0, 5),
            // getCredits(i).then((cast) => cast),
            getCredits(i)
              .then((results) => {
                console.log("success", results.cast);
                return results.cast;
              })
              .catch((err) => console.log("cast error", err)),
            resData.results[i].overview,
            resData.results[i].vote_average,
            "",
            hasUserSaved ? hasUserSaved.location : ""
          )
        );
      }

      dispatch({ type: LOAD_NEW_TV_SHOWS, new_tv_shows: loadedNewTVShows });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadAnime = () => {
  let hasUserSaved;
  return async (dispatch, getState) => {
    // console.log("🌈🌈", getState());
    try {
      const response = await fetch(`https://kitsu.io/api/edge/trending/anime`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      // console.log("ANIME", resData);

      const loadedAnime = [];
      const length = resData.data.length;

      for (let i = 0; i < length; i++) {
        // let credits;
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.data[i].id.toString()
        );
        // let cast = getCredits(i).then((cast) => cast);
        // console.log("CAST", cast);
        loadedAnime.push(
          new Movie(
            resData.data[i].id,
            resData.data[i].attributes.canonicalTitle,
            resData.data[i].attributes.posterImage.medium,
            resData.data[i].attributes.createdAt.toString().substr(0, 4),
            // getCredits(i).then((cast) => cast),
            [],
            resData.data[i].attributes.synopsis,
            resData.data[i].attributes.vote_average,
            "",
            hasUserSaved ? hasUserSaved.location : ""
          )
        );
      }

      // console.log("ANIME", loadedAnime);

      dispatch({ type: LOAD_ANIME, anime: loadedAnime });
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchMovies = (MovieTitle) => {
  let response;
  let hasUserSaved;
  // const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
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

      const searchedMovies = [];
      const length = resData.Search.length;

      for (i = 0; i < length; i++) {
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.Search[i].imdbID
        );
        searchedMovies.push(
          new Movie(
            resData.Search[i].imdbID,
            resData.Search[i].Title,
            resData.Search[i].Poster,
            resData.Search[i].Year,
            // getCredits(i).then((cast) => cast),
            [],
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
    await dispatch(clearGenreScreen());
    try {
      response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${config.TMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      // console.log(resData);

      const loadedMoviesWRTGenre = [];
      const length = resData.results.length;

      for (let i = 0; i < length; i++) {
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === resData.results[i].id.toString()
        );
        // let cast = getCredits(i).then((cast) => cast)
        // console.log("CAST", cast);
        loadedMoviesWRTGenre.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].title,
            posterBaseUrl + resData.results[i].poster_path,
            resData.results[i].release_date,
            // cast,
            // getCredits(i),
            [],
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
