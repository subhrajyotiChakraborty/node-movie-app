const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(process.env.DB_PATH)
    .then((client) => {
      _db = client.db("movies");
      cb();
    })
    .catch((err) => {
      console.log("Error while connecting the Mongo Client", err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  console.log("No DB found");
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
