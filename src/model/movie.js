const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

module.exports = class Movie {
  constructor(Poster, Title, Year, Type, imdbID) {
    this.poster = Poster;
    this.title = Title;
    this.year = Year;
    this.movieType = Type;
    this.imdbId = imdbID;
  }

  static getAll(cb) {
    fs.readFile(path.join("src", "data", "movies.json"), (err, data) => {
      if (!err) {
        const content = data.toString();
        cb({
          movies: JSON.parse(content)?.movies,
          code: 200,
        });
      } else {
        cb({
          msg: `Error while reading the data`,
          code: 500,
        });
        console.log("Error while reading the file", err);
      }
    });
  }

  save(cb) {
    fs.readFile(path.join("src", "data", "movies.json"), (err, data) => {
      if (!err) {
        const content = data.toString();
        const allMovies = JSON.parse(content)?.movies || [];
        const movieIndex = allMovies.findIndex((i) => i.imdbId === this.imdbId);

        if (movieIndex === -1) {
          allMovies.push(this);
          fs.writeFile(
            path.join(rootDir, "data", "movies.json"),
            JSON.stringify({ movies: allMovies }),
            "utf8",
            (error) => {
              if (error) {
                cb({
                  msg: `Error while write the data`,
                  success: false,
                  code: 500,
                });
                console.log("error during write the file", error);
              } else {
                cb({
                  msg: `movie ${this.imdbId} added successfully`,
                  success: true,
                  code: 201,
                });
              }
            }
          );
        } else {
          cb({
            msg: `movie ${this.imdbId} already exist in the fav list`,
            success: false,
            code: 400,
          });
        }
      } else {
        cb({
          msg: `Error while reading the data`,
          success: false,
          code: 500,
        });
        console.log("Error while reading the file", err);
      }
    });
  }
};
