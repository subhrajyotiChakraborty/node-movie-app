const Movie = require("../model/movie");

exports.getAllMoviesByName = async (req, res, next) => {
  const { movieName } = req.params;
  const { page } = req.query;
  const promiseResponse = await fetch(
    `https://omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieName}&page=${page}`,
    {
      method: "GET",
    }
  );
  const data = await promiseResponse.json();
  res.status(200).send(data);
};

exports.getMovieDetails = async (req, res, next) => {
  const { movieId } = req.params;
  const promiseResponse = await fetch(
    `https://omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieId}`,
    {
      method: "GET",
    }
  );
  const data = await promiseResponse.json();
  res.status(200).send(data);
};

exports.getFavorites = (req, res, next) => {
  Movie.getAll((data) => {
    if (data?.code === 200) {
      res.status(200).send({ movies: data?.movies });
    } else {
      res.status(data?.code).send({
        message: data?.msg,
      });
    }
  });
};

exports.postAddFavorite = (req, res, next) => {
  const { Title, Poster, imdbID, Type, Year } = req.body;
  const movie = new Movie(Poster, Title, Year, Type, imdbID);
  movie.save(({ msg, success, code }) => {
    res.status(code).send({
      message: msg,
      success,
    });
  });
};

exports.putUpdateRating = (req, res, next) => {
  const { Title, Poster, imdbID, Type, Year, userRating, _id } = req.body;
  const movie = new Movie(Poster, Title, Year, Type, imdbID, userRating, _id);
  movie.update(({ msg, success, code }) => {
    res.status(code).send({
      message: msg,
      success,
    });
  });
};

exports.deleteFavorite = (req, res, next) => {
  const { movieId } = req.params;
  Movie.delete(movieId, ({ msg, success, code }) => {
    res.status(code).send({
      message: msg,
      success,
    });
  });
};
