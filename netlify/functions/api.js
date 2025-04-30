const express = require("express");
const serverless = require("serverless-http");

const movieRoutes = require("../../src/routes/movie");

const api = express();

const router = Router();
router.get("/", (req, res) => res.send("Hello I am listening"));

api.use("/api/", router);
api.use(movieRoutes);

export const handler = serverless(api);
