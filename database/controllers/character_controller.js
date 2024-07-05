const Character = require("../models/character_model.js");

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({});
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await Character.findByIdAndUpdate(id, req.body);

    if (!character) {
      return res.status(404).json({ message: "character not found" });
    }

    const updatedCharacter = await Character.findById(id);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ messege: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);

    if (!character) {
      return res.status(404).json({ message: "character not found" });
    }

    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    res.status(500).json({ messege: error.message });
  }
};

module.exports = {
  getCharacters,
  getCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
};
