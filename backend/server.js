const connect =  require('./db/connection');
const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.set('strictQuery', false);

const app = express();

app.get("/", (req, res) => {
  res.send("api running");
});

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION;

// cat schema
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  color: String,
});

// cat model from the schema
const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;

const start = async () => {
  await connect(CONNECTION);

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

start();