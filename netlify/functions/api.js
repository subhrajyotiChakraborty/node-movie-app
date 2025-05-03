const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const movieRoutes = require("../../src/routes/movie");

const api = express();

api.get("/", (req, res) => res.send("Hello I am listening"));
api.use(cors());
api.use("/api/", movieRoutes);

export const handler = serverless(api);
