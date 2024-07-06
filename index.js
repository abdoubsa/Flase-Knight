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
  res.json({
    app_name: "Crud api for managing game characters ",
    add_character:
      "you can create a chararacter in postman using /api/characters/, the character has (characterName, characterRace, characterHP)",
    view_all_characters:
      "you can view all the characters in the database using /api/characters/all",
    view_specific_character:
      "you can veiw a specific character using /api/characters/:id",
    update_character:
      "you can update a character in postman using /api/characters/:id in a put request",
    delete_character:
      "you can delete a character in postman using /api/characters/:id in a delete request",
    view_paginated:
      "you can show a paginated view of certain characters list using /api/characters?page=<pageNumber>&limit=<number_of_characters_in_each_page>",
  });
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
