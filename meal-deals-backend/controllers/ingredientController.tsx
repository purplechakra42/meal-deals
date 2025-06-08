const { createItem, getAllInfo, getOneInfoByPk, deleteItem } = require("./GLOBALcontroller.tsx");
const Ingredient = require("../models/ingredient.tsx");

// CREATE
const createIngredient = createItem(Ingredient, "Ingredient");

// READ
const getIngredientByID = getOneInfoByPk(Ingredient, "Ingredient");
const getAllIngredients = getAllInfo(Ingredient, "Ingredient");

// UPDATE

// DELETE
const deleteIngredientByID = deleteItem(Ingredient, "Ingredient");

module.exports = { createIngredient, getIngredientByID, getAllIngredients, deleteIngredientByID };
