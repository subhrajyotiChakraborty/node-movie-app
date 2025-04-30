const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/movies/:movieName", async (req, res) => {
  const { movieName } = req.params;
  const promiseResponse = await fetch(
    `https://omdbapi.com/?apikey=ab72bd09&s=${movieName}`,
    {
      method: "GET",
    }
  );
  const data = await promiseResponse.json();

  res.status(200).send(data);
});

app.listen(3000);
