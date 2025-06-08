const express = require("express");
const { createAisle, getAisleByID, getAllAisles, deleteAisleByID } = require("../controllers/aisleController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.post("/", createAisle);

router.get("/:id", getAisleByID);
router.get("/", getAllAisles);
// router.get("/:name", getAisleByName); // DON'T DO THIS - if you want both, either use /pos/:pos, or filter based on variable type

router.delete("/:id", deleteAisleByID);

module.exports = router;
