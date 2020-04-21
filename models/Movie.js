class Movie {
  constructor(id, title, posterUrl, year, cast, plot, ratings) {
    (this.id = id),
      (this.title = title),
      (this.posterUrl = posterUrl),
      (this.year = year),
      (this.cast = cast);
    (this.plot = plot), (this.ratings = ratings);
  }
}

export default Movie;
