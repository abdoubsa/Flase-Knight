const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.json("hello world");
});

PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
