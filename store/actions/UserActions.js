import Movie from "../../models/Movie";

export const SAVE_MOVIES = "SAVE_MOVIES";
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
            resData[key].year,
            "",
            "",
            "",
            "",
            resData[key].location
          )
        );
      }

      dispatch({
        type: LOAD_MOVIES,
        userMovies: loadedData,
        // watched: loadedData.filter(
        //   (userMovie) => userMovie.location === "WATCHED"
        // ),
        // currently_watching: loadedData.filter(
        //   (userMovie) => userMovie.location === "CURRENTLY_WATCHING"
        // ),
        // want_to_watch: loadedData.filter(
        //   (userMovie) => userMovie.location === "WANT_TO_WATCH"
        // ),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const saveMovies = (id, title, posterUrl, year, location) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userMovies.json",
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
            location,
          }),
        }
      );

      const resData = await response.json();
      console.log(resData);

      dispatch({
        type: SAVE_MOVIES,
        userMovie: {
          id,
          title,
          posterUrl,
          year,
          location,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
