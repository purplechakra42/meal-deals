const { createItem, getAllInfo, getOneInfoByPk, deleteItem } = require("./GLOBALcontroller.tsx");
const Aisle = require("../models/aisle.tsx");

// CREATE
const createAisle = createItem(Aisle, "Aisle");

// READ
const getAisleByID = getOneInfoByPk(Aisle, "Aisle");
const getAllAisles = getAllInfo(Aisle, "Aisle");

// UPDATE

// DELETE
const deleteAisleByID = deleteItem(Aisle, "Aisle");

module.exports = { createAisle, getAisleByID, getAllAisles, deleteAisleByID };
