const express = require("express");
const serverless = require("serverless-http");

const movieRoutes = require("../../src/routes/movie");

const api = express();

app.get("/", (req, res) => res.send("Hello I am listening"));

api.use("/api/", router);
api.use("/api/", movieRoutes);

export const handler = serverless(api);
