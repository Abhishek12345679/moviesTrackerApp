import Movie from "../../models/Movie";
import Story from "../../models/Story";

export const SAVE_MOVIES = "SAVE_MOVIES";
export const LOAD_MOVIES = "LOAD_MOVIES";
export const ADD_STORY = "ADD_STORY";
export const LOAD_STORY = "LOAD_STORY";

export const addStory = (id, title, genres, language, movieLink) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userStories.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            genres,
            language,
            movieLink,
          }),
        }
      );

      const resData = await response.json();
      // console.log(resData);
      dispatch({
        type: ADD_STORY,
        userStories: {
          id,
          title,
          genres,
          language,
          movieLink,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadStory = () => {
  return async (dispatch) => {
    // WAIT FOR THIS TO LOAD
    try {
      const response = await fetch(
        "https://moviey-e67d9.firebaseio.com/userStories.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();

      // console.log(resData);
      const loadedData = [];

      for (const key in resData) {
        loadedData.push(
          new Story(
            resData[key].id,
            resData[key].title,
            resData[key].genres,
            resData[key].language,
            resData[key].movieLink
          )
        );
      }

      dispatch({
        type: LOAD_STORY,
        userStories: loadedData,
      });
    } catch (err) {
      throw err;
    }
  };
};

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

      // console.log(resData);
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

      // const resData = await response.json();
      // console.log(resData);

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
