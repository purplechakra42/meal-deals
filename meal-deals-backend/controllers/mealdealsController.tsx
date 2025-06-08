const { createItem, getAllInfo, getOneInfoByPk, getAllWhere, updateItemPatch, deleteItem } = require("./GLOBALcontroller.tsx");
const MealDeals = require("../models/mealdeals.tsx");

// CREATE

// READ
const getMealDealsByID = getOneInfoByPk(MealDeals, "MealDeal");
const getAllMealDeals = getAllInfo(MealDeals, "MealDeal");

// UPDATE
const updateMealDealPatch = updateItemPatch(MealDeals, "MealDeal");

// DELETE

module.exports = { getMealDealsByID, getAllMealDeals, updateMealDealPatch };
