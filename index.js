const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./database/main");
const Character = require("./database/models/character_model.js");
const characterRoute = require("./database/routes/character_route.js");

//middleware
app.use(express.json());

//routes
app.use("/api/characters", characterRoute);

//
app.get("/", (req, res) => {
  res.json("default page");
});

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

// global error handling middleware
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

const PORT = 5000;
async function start() {
  try {
    await connectToDB(process.env.DATABASE_URL);
    app.listen(PORT, () => {
      console.log(`server is runing on ${PORT}`);
    });
  } catch {
    console.log("error");
  }
}
start();
