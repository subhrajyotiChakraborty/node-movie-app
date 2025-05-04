const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoutes = require("../../src/routes/movie");
const { mongoConnect } = require("../../src/util/database");

const api = express();

api.get("/", (req, res) => res.send("Hello I am listening"));
api.use(cors());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use("/api/", movieRoutes);

export const handler = () => {
  mongoConnect(() => {
    return serverless(api);
  });
};
