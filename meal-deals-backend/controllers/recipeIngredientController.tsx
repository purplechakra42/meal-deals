const { createItem, createMultipleItems, getAllInfo, getOneInfoByPk, getAllWhere, updateItemPatch, deleteItem, deleteAllWhere } = require("./GLOBALcontroller.tsx");
const RecipeIngredient = require("../models/recipeingredient.tsx");

// CREATE
const addIngredientToRecipe = createItem(RecipeIngredient, "RecipeIngredient");

// READ
const getAllRecipeIngredients = getAllInfo(RecipeIngredient, "RecipeIngredient");
const getRecipeIngredients = getAllWhere(RecipeIngredient, "RecipeIngredient", "recipeID");

// UPDATE
const patchRecipeIngredient = updateItemPatch(RecipeIngredient, "RecipeIngredient");

// DELETE
const deleteIngredientFromRecipe = deleteItem(RecipeIngredient, "RecipeIngredient");

module.exports = { getAllRecipeIngredients, getRecipeIngredients, addIngredientToRecipe, patchRecipeIngredient, deleteIngredientFromRecipe };
