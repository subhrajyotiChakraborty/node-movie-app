const express = require("express");

const movieController = require("../controller/movie");

const router = express.Router();

router.get("/movies/:movieName", movieController.getAllMoviesByName);
router.get("/movie/:movieId", movieController.getMovieDetails);

module.exports = router;
