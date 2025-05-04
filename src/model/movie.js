const { ObjectId } = require("mongodb");

const { getDB } = require("../util/database");

module.exports = class Movie {
  constructor(Poster, Title, Year, Type, imdbID, userRating, _id) {
    this.poster = Poster;
    this.title = Title;
    this.year = Year;
    this.movieType = Type;
    this.imdbId = imdbID;
    this.userRating = userRating ? userRating : 0;
    this._id = _id ? new ObjectId(_id) : null;
  }

  static getAll(cb) {
    const db = getDB();
    db.collection("movie")
      .find()
      .toArray()
      .then((result) => {
        cb({
          movies: result,
          code: 200,
        });
      })
      .catch((err) => {
        cb({
          msg: `Error while reading the data`,
          code: 500,
        });
        console.log("Error while reading", err);
      });
  }

  save(cb) {
    const db = getDB();
    db.collection("movie")
      .findOne({ imdbId: this.imdbId })
      .then((findRes) => {
        if (findRes?.imdbId) {
          cb({
            msg: `movie ${this.imdbId} already exist in the fav list`,
            success: false,
            code: 400,
          });
        } else {
          db.collection("movie")
            .insertOne(this)
            .then((result) => {
              console.log("added", result);
              cb({
                msg: `movie ${this.imdbId} added successfully`,
                success: true,
                code: 201,
              });
            })
            .catch((err) => {
              console.log("Error while save the record", err);
              cb({
                msg: `Error while write the data`,
                success: false,
                code: 500,
              });
            });
        }
      })
      .catch((findErr) => {
        console.log("Error while find existing", findErr);
        cb({
          msg: `Error in DB`,
          success: false,
          code: 500,
        });
      });
  }

  update(cb) {
    const db = getDB();
    db.collection("movie")
      .updateOne({ imdbId: this.imdbId }, { $set: this })
      .then((res) => {
        if (res?.matchedCount === 0) {
          cb({
            msg: `movie ${this.imdbId} does not exist`,
            success: false,
            code: 400,
          });
        } else {
          cb({
            msg: `movie ${this.imdbId} updated successfully`,
            success: false,
            code: 200,
          });
        }
      })
      .catch((err) => {
        console.log("Error while updating", err);
        cb({
          msg: `Error while updating`,
          success: false,
          code: 500,
        });
      });
  }

  static delete(movieId, cb) {
    const db = getDB();
    db.collection("movie")
      .findOne({ imdbId: movieId })
      .then((findRes) => {
        if (findRes?.imdbId) {
          db.collection("movie")
            .deleteOne({ imdbId: movieId })
            .then((result) => {
              cb({
                msg: `movie ${movieId} deleted successfully`,
                success: true,
                code: 200,
              });
            })
            .catch((err) => {
              console.log("Error while delete the record", err);

              cb({
                msg: `Error while delete the data`,
                success: false,
                code: 500,
              });
            });
        } else {
          cb({
            msg: `movie ${movieId} id is not exist`,
            success: false,
            code: 400,
          });
        }
      })
      .catch((findErr) => {
        console.log("Error while find existing", findErr);
        cb({
          msg: `Error in DB`,
          success: false,
          code: 500,
        });
      });
  }
};
