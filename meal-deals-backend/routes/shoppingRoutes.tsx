const express = require("express");
const { getAllShopping, addRecipeIngreds, patchShopping, resetAllShopping, deleteRecipeIngreds } = require("../controllers/shoppingController.tsx");

const router = express.Router();

router.post("/:id", addRecipeIngreds);

router.get("/", getAllShopping);

router.patch("/reset", resetAllShopping); // static endpoints should be defined first - if the url matches 'reset' then it will do this one, otherwise it will be interpreted as an id below
router.patch("/:id", patchShopping);

router.delete("/:MealDealId", deleteRecipeIngreds);

module.exports = router;
