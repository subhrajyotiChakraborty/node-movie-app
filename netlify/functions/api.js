const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoutes = require("../../src/routes/movie");
const { mongoConnect } = require("../../src/util/database");

const api = express();

api.use(cors());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// This middleware will run on every request and ensure DB is available
api.use(async (req, res, next) => {
  try {
    mongoConnect(() => {
      next();
    }); // Attach cached DB connection to request
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    res.status(500).json({ error: "Failed to connect to database" });
  }
});

// Define routes
api.get("/", (req, res) => res.send("Hello I am listening"));
api.use("/api", movieRoutes);

// Wrap Express app with serverless-http
const handler = serverless(api);

// Proper export
exports.handler = async (event, context) => {
  return await handler(event, context);
};
