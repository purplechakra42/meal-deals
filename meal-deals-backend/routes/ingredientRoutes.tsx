const express = require("express");
const { createIngredient, getIngredientByID, getAllIngredients, deleteIngredientByID } = require("../controllers/ingredientController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.post("/", createIngredient);

router.get("/:id", getIngredientByID);
router.get("/", getAllIngredients);

router.delete("/:id", deleteIngredientByID);

module.exports = router;
