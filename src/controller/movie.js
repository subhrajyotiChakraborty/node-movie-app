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
