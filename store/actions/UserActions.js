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

export const saveMovies = (id, title, posterUrl, year) => {
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
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
