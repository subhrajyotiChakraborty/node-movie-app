exports.getMovie = async (req, res, next) => {
  const { movieName } = req.params;
  const promiseResponse = await fetch(
    `https://omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieName}`,
    {
      method: "GET",
    }
  );
  const data = await promiseResponse.json();
  res.status(200).send(data);
};
