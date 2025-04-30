exports.getMovies = async (req, res) => {
  const { movieName } = req.params;
  const promiseResponse = await fetch(
    `https://omdbapi.com/?apikey=ab72bd09&s=${movieName}`,
    {
      method: "GET",
    }
  );
  const data = await promiseResponse.json();
  res.status(200).send(data);
};
