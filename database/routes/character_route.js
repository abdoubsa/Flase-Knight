const express = require("express");
const Character = require("../models/character_model.js");
const router = express.Router();
const characterController = require("../controllers/character_controller.js");
//

// get all characters
router.get("/", characterController.getCharacters);
// get a specific character
router.get("/:id", characterController.getCharacter);
// add a character
router.post("/", characterController.addCharacter);
// update a character
router.put("/:id", characterController.updateCharacter);
// delete a character
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
