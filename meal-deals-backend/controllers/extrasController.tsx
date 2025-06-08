const { createItem, getAllInfo, getOneInfoByPk, updateItemPatch, deleteItem } = require("./GLOBALcontroller.tsx");
const Extras = require("../models/extras.tsx");

// CREATE
const createExtra = createItem(Extras, "Extras");

// READ
const getAllExtras = getAllInfo(Extras, "Extras");

// UPDATE
const patchExtra = updateItemPatch(Extras, "Extras");

// DELETE
const deleteExtra = deleteItem(Extras, "Extras");

module.exports = { createExtra, getAllExtras, patchExtra, deleteExtra };
