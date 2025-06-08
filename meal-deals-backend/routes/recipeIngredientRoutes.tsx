const express = require("express");
const { getAllRecipeIngredients, getRecipeIngredients, addIngredientToRecipe, patchRecipeIngredient, deleteIngredientFromRecipe } = require("../controllers/recipeIngredientController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.post("/:recipeID", addIngredientToRecipe);

router.get("/", getAllRecipeIngredients);
router.get("/:recipeID", getRecipeIngredients);

router.patch("/:id", patchRecipeIngredient);

router.delete("/:recipeID/:id", deleteIngredientFromRecipe);

module.exports = router;
