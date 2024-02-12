const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/cartify").then((con) => {
    console.log("DB Connected sucessfully");
  });
};
module.exports = connectDB;
