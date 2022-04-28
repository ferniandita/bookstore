const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/db_buku");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection failed"));

db.once("open", () => {
  console.log("Database connection success");
});
