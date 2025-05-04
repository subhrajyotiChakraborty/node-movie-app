const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movie");
const { mongoConnect } = require("./util/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(movieRoutes);

mongoConnect(() => {
  console.log("DB connection successful");
  app.listen(3000);
});
