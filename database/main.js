const mongoose = require("mongoose");

async function connectToDB(url) {
  await mongoose.connect(url, {
    dbName: "backend",
  });

  console.log("Connected to the database");
}

module.exports = connectToDB;
