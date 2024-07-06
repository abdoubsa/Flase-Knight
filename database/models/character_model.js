const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    characterName: {
      type: String,
      required: [true, "You must enter a name for your character"],
      unique: [true, "the name must be unique"],
    },

    characterRace: {
      type: String,
      required: [true, "You must enter your characters race"],
    },

    characterHP: {
      type: Number,
      default: 100,
    },
  },
  {
    timestaps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
