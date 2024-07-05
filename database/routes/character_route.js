const express = require("express");
const Character = require("../models/character_model.js");
const router = express.Router();
const characterController = require("../controllers/character_controller.js");
//

// get all characters
router.get("/", characterController.getCharacters);

router.get("/:id", characterController.getCharacter);

router.post("/", characterController.addCharacter);

router.put("/:id", characterController.updateCharacter);

router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
