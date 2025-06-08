const express = require("express");
const { getMealDealsByID, getAllMealDeals, updateMealDealPatch } = require("../controllers/mealdealsController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.get("/:day", getMealDealsByID);
router.get("/", getAllMealDeals);

router.patch("/:id", updateMealDealPatch);

module.exports = router;
