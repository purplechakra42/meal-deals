const { createItem, createMultipleItems, getAllInfo, getOneInfoByPk, getAllWhere, updateItemPatch, deleteItem, deleteAllWhere } = require("./GLOBALcontroller.tsx");
const Recipe = require("../models/recipe.tsx");
const RecipeIngredient = require("../models/recipeingredient.tsx");

// CREATE
const createRecipe = createItem(Recipe, "Recipe");

// READ
const getRecipeByID = getOneInfoByPk(Recipe, "Recipe");
const getAllRecipes = getAllInfo(Recipe, "Recipe");

// UPDATE

// DELETE
const deleteRecipeByID = deleteItem(Recipe, "Recipe");

module.exports = { createRecipe, getRecipeByID, getAllRecipes, deleteRecipeByID };
