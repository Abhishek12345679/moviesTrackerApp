import React, { useState } from "react";

export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const LOAD_MOVIES_WITH_GENRES = "LOAD_MOVIES_WITH_GENRES";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";
export const CLEAR_GENRE_SCREEN = "CLEAR_GENRE_SCREEN";
export const LOAD_ALL = "LOAD_ALL";

import Movie from "../../models/Movie";

import config from "../../config";
import Cast from "../../models/CastMember";

const getCredits = async (index) => {
  let response, creditsData;
  try {
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${resData.results[index].id}?api_key=${config.TMDB_API_KEY}&language=en-US&append_to_response=credits`
    );
    creditsData = await response.json();
    // console.log("credits", creditsData);
  } catch (err) {
    throw new Error(err);
  }

  const castMembers = [];
  const length =
    creditsData.credits.cast.length > 10 ? 10 : creditsData.credits.cast.length;

  for (let i = 0; i < 6; i++) {
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

const getLanguageNamefromCode = async (lng_code) => {
  let response, langData, lang;
  try {
    response = await fetch(
      `https://restcountries.eu/rest/v2/lang/${lng_code}?fields=languages`
    );
    langData = await response.json();
    // console.log(langData[0].languages[0]);
    if (langData[0].languages[0].iso639_1 === lng_code) {
      lang = langData[0].languages[0].name;
      // console.log(lang);
    } else if (langData[0].languages[0].iso639_1 === lng_code || !langData) {
      lang = "no language";
    }
    return lang;
  } catch (err) {
    throw new Error(err);
  }
};

export const clearSearchList = () => {
  return { type: CLEAR_SEARCH_LIST };
};

export const clearGenreScreen = () => {
  return {
    type: CLEAR_GENRE_SCREEN,
  };
};

export const loadAll = (isType, pg_no) => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  let hasUserSaved;
  const movies;
  const trendingMovies,trendingTV,trendingAnime;
  const moviesResponse,TrendingMoviesResponse,trendingTVResponse,trendingAnimeResponse;
  const loadedStories = [];
  return async (dispatch, getState) => {
    try {
      //stories response
      if (isType === "ALL") {
        moviesResponse = await fetch(
          `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=tokyo`
        );
        // trending movies
        TrendingMoviesResponse = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${config.TMDB_API_KEY}`
        );
        // trending TV
        trendingTVResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${config.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&first_air_date_year=2020&page=1&with_original_language=en`
        );
        // trending Anime
        trendingAnimeResponse = await fetch(
          `https://kitsu.io/api/edge/trending/anime`,
          {
            method: "GET",
          }
        );
      } else if (isType === "TRENDING_MOVIES") {
        TrendingMoviesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${config.TMDB_API_KEY}&sort_by=popularity.desc&first_air_date_year=2020&page=1&`
        );
      } else if (isType === "TRENDING_TV") {
        trendingTVResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${config.TMDB_API_KEY}&sort_by=popularity.desc&first_air_date_year=2020&page=${pg_no}`
        );
      } else if (isType === "ANIME") {
        trendingAnimeResponse = await fetch(
          `https://kitsu.io/api/edge/trending/anime`,
          {
            method: "GET",
          }
        );
      }


      if (isType === "ALL") {
        if (
          !moviesResponse.ok ||
          !TrendingMoviesResponse.ok ||
          !trendingTVResponse.ok ||
          !trendingAnimeResponse.ok
        ) {
          throw new Error("failed response");
        }
      } else if (isType === "TRENDING_MOVIES") {
        if (!TrendingMoviesResponse.ok) {
          throw new Error("failed response");
        }
      } else if (isType === "TRENDING_TV") {
        if (!trendingTVResponse.ok) {
          throw new Error("failed response");
        }
      }else if(isType === 'ANIME'){
        if(!trendingAnimeResponse.ok){
          throw new Error("failed response");
        }
      }else{
        return;
      }

      if (isType === "ALL") {
         movies = await moviesResponse.json();
         trendingMovies = await TrendingMoviesResponse.json();
         trendingTV = await trendingTVResponse.json();
         trendingAnime = await trendingAnimeResponse.json();
      } else if (isType === "TRENDING_MOVIES") {
         trendingMovies = await TrendingMoviesResponse.json();
      } else if (isType === "TRENDING_TV") {
         trendingTV = await trendingTVResponse.json();
      }else if(isType === 'ANIME'){
         trendingAnime = await trendingAnimeResponse.json();
      }else{
        return;
      }

      if(isType === 'ALL'){
     //stories array

     const loadedMoviesLength = movies.Search.length;

     for (let i = 0; i < 6; i++) {
       loadedStories.push(
         new Movie(
           movies.Search[i].imdbID,
           movies.Search[i].Title,
           movies.Search[i].Poster,
           movies.Search[i].Year
         )
       );
     }    
      }
      

 
      //trending movies array

      // console.log("loadedTrendingMovies", loadedTrendingMovies);

      const loadedTrendingMoviesLength = trendingMovies.results.length;

      // loadedTrendingMovies =
      let loadedTrendingMovies = await Promise.all(
        trendingMovies.results
          .slice(0, 6) // use slice instead of a loop
          .map((
            trendingMovie // map movie to [language,movie]
          ) =>
            getLanguageNamefromCode(
              // get async language
              trendingMovie.original_language
              // resolve to [language,movie]
            ).then((language) => [language, trendingMovie])
          ) // sorry, forgot to return here
      ).then((
        results // results is [[language,movie],[language,movie]]
      ) =>
        results.map(([language, trendingMovie]) => {
          const hasUserSaved = getState().UserMovies.userMovies.find(
            (userMovie) => userMovie.id === trendingMovie.id.toString()
            // snippet does not have conditional chaining
          );
          return new Movie( // create new Movie
            trendingMovie.id.toString(),
            trendingMovie.media_type === "movie"
              ? trendingMovie.title
              : trendingMovie.name,
            posterBaseUrl + trendingMovie.poster_path,
            trendingMovie.media_type === "movie"
              ? trendingMovie.release_date
              : trendingMovie.first_air_date,
            [],
            trendingMovie.overview,
            trendingMovie.vote_average,
            language,
            hasUserSaved ? hasUserSaved.location : ""
          );
        })
      );

      // trending TV Shows
      const TVShowsLength = trendingTV.results.length;
      let loadedNewTVShows = await Promise.all(
        trendingTV.results
          .slice(0, 6) // use slice instead of a loop
          .map((
            trendingTVShow // map movie to [language,movie]
          ) =>
            getLanguageNamefromCode(
              // get async language
              trendingTVShow.original_language
              // resolve to [language,movie]
            ).then((language) => [language, trendingTVShow])
          ) // sorry, forgot to return here
      ).then((
        results // results is [[language,movie],[language,movie]]
      ) =>
        results.map(([language, trendingTVShow]) => {
          const hasUserSaved = getState().UserMovies.userMovies.find(
            (userMovie) => userMovie.id === trendingTVShow.id.toString()
            // snippet does not have conditional chaining
          );
          return new Movie( // create new Movie
            trendingTVShow.id.toString(),
            trendingTVShow.name,
            posterBaseUrl + trendingTVShow.poster_path,
            trendingTVShow.first_air_date,
            [],
            trendingTVShow.overview,
            trendingTVShow.vote_average,
            language,
            hasUserSaved ? hasUserSaved.location : ""
          );
        })
      );

      const loadedAnime = [];
      const AnimeLength = trendingAnime.data.length;

      for (let i = 0; i < 6; i++) {
        // let credits;
        hasUserSaved = getState().UserMovies.userMovies.find(
          (userMovie) => userMovie.id === trendingAnime.data[i].id.toString()
        );
        // let cast = getCredits(i).then((cast) => cast);
        // console.log("CAST", cast);
        loadedAnime.push(
          new Movie(
            trendingAnime.data[i].id,
            trendingAnime.data[i].attributes.canonicalTitle,
            trendingAnime.data[i].attributes.posterImage.medium,
            trendingAnime.data[i].attributes.createdAt.toString().substr(0, 4),
            // getCredits(i).then((cast) => cast),
            [],
            trendingAnime.data[i].attributes.synopsis,
            trendingAnime.data[i].attributes.vote_average,
            "Japanese",
            hasUserSaved ? hasUserSaved.location : ""
          )
        );
      }

      dispatch({
        type: LOAD_ALL,
        movies: loadedStories,
        new_releases: loadedTrendingMovies,
        new_tv_shows: loadedNewTVShows,
        anime: loadedAnime,
      });
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
        `https://api.themoviedb.org/3/search/movie?api_key=${config.TMDB_API_KEY}&query=${MovieTitle}&page=1`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log("search results: ", resData);

      const length = resData.results.length;
      let searchedMovies = await Promise.all(
        resData.results
          // .slice(0, length) // use slice instead of a loop
          .map((
            searchedMovie // map movie to [language,movie]
          ) =>
            getLanguageNamefromCode(
              // get async language
              searchedMovie.original_language
              // resolve to [language,movie]
            ).then((language) => [language, searchedMovie])
          ) // sorry, forgot to return here
      ).then((
        results // results is [[language,movie],[language,movie]]
      ) =>
        results.map(([language, searchedMovie]) => {
          const hasUserSaved = getState().UserMovies.userMovies.find(
            (userMovie) => userMovie.id === searchedMovie.id.toString()
            // snippet does not have conditional chaining
          );
          return new Movie( // create new Movie
            searchedMovie.id.toString(),
            searchedMovie.title,
            posterBaseUrl + searchedMovie.poster_path,
            searchedMovie.release_date,
            [],
            searchedMovie.overview,
            searchedMovie.vote_average,
            language,
            hasUserSaved ? hasUserSaved.location : ""
          );
        })
      );
      dispatch({
        type: SEARCH_MOVIES,
        searched_movies: searchedMovies,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadMoviesWithGenres = (genreId, page_no) => {
  let response;
  let hasUserSaved;
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185";
  return async (dispatch, getState) => {
    // await dispatch(clearGenreScreen());
    try {
      response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${config.TMDB_API_KEY}&page=${page_no}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      // console.log(resData);

      const length = resData.results.length;
      const loadedMoviesWRTGenre = await Promise.all(
        resData.results
          .slice(0, length) // use slice instead of a loop
          .map((
            movieWRTGenre // map movie to [language,movie]
          ) =>
            getLanguageNamefromCode(
              // get async language
              movieWRTGenre.original_language
              // resolve to [language,movie]
            ).then((language) => [language, movieWRTGenre])
          ) // sorry, forgot to return here
      ).then((
        results // results is [[language,movie],[language,movie]]
      ) =>
        results.map(([language, movieWRTGenre]) => {
          const hasUserSaved = getState().UserMovies.userMovies.find(
            (userMovie) => userMovie.id === movieWRTGenre.id.toString()
            // snippet does not have conditional chaining
          );
          return new Movie( // create new Movie
            movieWRTGenre.id.toString(),
            movieWRTGenre.title,
            posterBaseUrl + movieWRTGenre.poster_path,
            movieWRTGenre.release_date,
            [],
            movieWRTGenre.overview,
            movieWRTGenre.vote_average,
            language,
            hasUserSaved ? hasUserSaved.location : ""
          );
        })
      );
      dispatch({
        type: LOAD_MOVIES_WITH_GENRES,
        moviesWRTGenre: loadedMoviesWRTGenre,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
