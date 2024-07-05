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
  res.json("hello world");
});

app.use((req, res) => {
  res.status(404).json("Page not found");
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
