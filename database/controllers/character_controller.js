const Character = require("../models/character_model.js");

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({});
    const total = await Character.countDocuments();
    res.status(200).json({
      total_number: total,
      data: characters,
    });
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
    res.status(200).json({
      message: "sucessfully added this character",
      character: character,
    });
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

const paginateCharacters = async (req, res) => {
  try {
    // Extract page and limit from query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index
    const startIndex = (page - 1) * limit;

    // Query the database for paginated results
    const characters = await Character.find().skip(startIndex).limit(limit);

    // Get the total number of characters in the collection
    const total = await Character.countDocuments();

    // Send the paginated results in the response
    res.json({
      page,
      limit,
      total,
      data: characters,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCharacters,
  getCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  paginateCharacters,
};
