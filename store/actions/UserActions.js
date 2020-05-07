import Movie from "../../models/Movie";

export const SAVE_MOVIES_WATCHED = "SAVE_MOVIES";
export const SAVE_MOVIES_WATCHING = "SAVE_MOVIES";
export const SAVE_MOVIES_WILL_WATCH = "SAVE_MOVIES";
export const LOAD_MOVIES = "LOAD_MOVIES";

export const loadMovies = () => {
  return async (dispatch) => {
    // WAIT FOR THIS TO LOAD
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userMovies.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();

      console.log(resData);
      const loadedData = [];

      for (const key in resData) {
        loadedData.push(
          new Movie(
            resData[key].id,
            resData[key].title,
            resData[key].posterUrl,
            resData[key].year
          )
        );
      }

      dispatch({
        type: LOAD_MOVIES,
        userMovies: loadedData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const saveMoviesWatched = (id, title, posterUrl, year) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userMoviesWatched.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            posterUrl,
            year,
          }),
        }
      );

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: SAVE_MOVIES_WATCHED,
        userMovieWatched: {
          id,
          title,
          posterUrl,
          year,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveMoviesWatching = (id, title, posterUrl, year) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userMoviesWatching.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            posterUrl,
            year,
          }),
        }
      );

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: SAVE_MOVIES_WATCHING,
        userMovieWatching: {
          id,
          title,
          posterUrl,
          year,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveMoviesWillWatch = (id, title, posterUrl, year) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userMoviesWillWatch.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            posterUrl,
            year,
          }),
        }
      );

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: SAVE_MOVIES_WILL_WATCH,
        userMovieWillWatch: {
          id,
          title,
          posterUrl,
          year,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
