const express = require("express");

const movieController = require("../controller/movie");

const router = express.Router();

router.get("/movies/:movieName", movieController.getMovie);

module.exports = router;
