const express = require("express");
const { createRecipe, addIngredientToRecipe, getRecipeByID, getAllRecipes, getRecipeIngredients, deleteRecipeByID, deleteIngredientFromRecipe } = require("../controllers/recipeController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.post("/", createRecipe);

router.get("/:id", getRecipeByID);
router.get("/", getAllRecipes);

router.delete("/:id", deleteRecipeByID);

module.exports = router;
