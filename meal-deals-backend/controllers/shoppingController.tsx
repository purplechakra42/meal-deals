const { createItem, createMultipleItems, getAllInfo, getOneInfoByPk, getAllWhere, updateItemPatch, deleteItem, deleteAllWhere } = require("./GLOBALcontroller.tsx");
const Shopping = require("../models/shopping.tsx");

// CREATE
const addRecipeIngreds = createMultipleItems(Shopping, "Shopping");

// READ
const getAllShopping = getAllInfo(Shopping, "Shopping");

// UPDATE
const patchShopping = updateItemPatch(Shopping, "Shopping");
const resetAllShopping = async (req, res) => {
  try {
    console.log("Received request to reset all shopping items' need/bought");
    Shopping.update({ need: false, bought: false }, { where: {} }); // where {} means all items
    res.status(201).json({ message: "Reset all shopping items" });
  } catch (err) {
    console.error(`Database error in Shopping: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

// DELETE
const deleteRecipeIngreds = deleteAllWhere(Shopping, "Shopping", "MealDealId");

module.exports = { getAllShopping, addRecipeIngreds, patchShopping, resetAllShopping, deleteRecipeIngreds };
