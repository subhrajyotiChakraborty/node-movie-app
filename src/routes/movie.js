const express = require("express");

const movieController = require("../controller/movie");

const router = express.Router();

router.get("/movies/:movieName", movieController.getAllMoviesByName);
router.get("/movie/:movieId", movieController.getMovieDetails);
router.get("/favorites", movieController.getFavorites);
router.post("/movie", movieController.postAddFavorite);

module.exports = router;
