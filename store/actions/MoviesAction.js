export const LOAD_STORIES = "LOAD_MOVIES";
export const LOAD_NEW_RELEASES = "LOAD_NEW_RELEASES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const CLEAR_SEARCH_LIST = "CLEAR_SEARCH_LIST";
export const LOAD_MOVIES_WITH_GENRES = "LOAD_MOVIES_WITH_GENRES";

import Movie from "../../models/Movie";

import config from "../../config";

export const clearSearchList = () => {
  return { type: CLEAR_SEARCH_LIST };
};

export const loadStories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=sex`
      );

      // const responseWithCast = await fetch(
      //   `https://api.themoviedb.org/3/movie/150540?api_key=${config.TMDB_API_KEY}&append_to_response=credits`
      // );

      // const resDataWithCast = await responseWithCast.json();
      // console.log("cast", resDataWithCast);

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
            [
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
            ]
          )
        );
      }
      dispatch({ type: LOAD_STORIES, movies: loadedMovies });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadNewReleases = () => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185/";
  return async (dispatch) => {
    try {
      // const response = await fetch(
      //   `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${MovieTitle}`
      // );
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${config.TMDB_API_KEY}`
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
        `https://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${MovieTitle}&plot=full`
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
            resData.Search[i].Year,
            [],
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, numquam cupiditate obcaecati commodi dolores veritatis nam ad consequatur laudantium provident nobis dolore maiores dicta voluptas exercitationem soluta dolorem. Ullam, totam."
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
  const posterBaseUrl = "http://image.tmdb.org/t/p/w185/";
  return async (dispatch) => {
    try {
      response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${config.TMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("failed response");
      }

      const resData = await response.json();
      console.log(resData);

      // const responseWithCast = await fetch(
      //   `https://api.themoviedb.org/3/movie/150540?api_key=${config.TMDB_API_KEY}&append_to_response=credits`
      // );

      // const resDataWithCast = await responseWithCast.json();
      // console.log("cast", resDataWithCast);

      const loadedMoviesWRTGenre = [];

      for (let i = 0; i < 5; i++) {
        loadedMoviesWRTGenre.push(
          new Movie(
            resData.results[i].id.toString(),
            resData.results[i].title,
            posterBaseUrl + resData.results[i].backdrop_path,
            resData.results[i].release_date,
            [
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
              { name: "Andy Samberg" },
            ],
            resData.results[i].overview,
            resData.results[i].vote_average
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

// export const loadCast = (movieId) => {
//   const posterBaseUrl = "http://image.tmdb.org/t/p/w185/";
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.TMDB_API_KEY}&append_to_response=credits`
//       );

//       if (!response.ok) {
//         throw new Error("failed response");
//       }

//       const resData = await response.json();
//       console.log(resData);

//       const loadedMoviesWRTGenre = [];

//       for (let i = 0; i < 5; i++) {
//         loadedMoviesWRTGenre.push(
//           new Movie(
//             resData.results[i].id.toString(),
//             resData.results[i].title,
//             posterBaseUrl + resData.results[i].backdrop_path,
//             resData.results[i].release_date
//           )
//         );
//       }

//       console.log("moviesWRTGenre", loadedMoviesWRTGenre);

//       dispatch({
//         type: LOAD_MOVIES_WITH_GENRES,
//         moviesWRTGenre: loadedMoviesWRTGenre,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
