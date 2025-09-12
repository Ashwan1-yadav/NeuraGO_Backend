const mongoose = require("mongoose");

const connectDB = async (mongoURL) => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database error -> ", err);
    });
};

module.exports = connectDB;