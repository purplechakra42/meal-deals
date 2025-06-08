const express = require("express");
const { createExtra, getAllExtras, patchExtra, deleteExtra } = require("../controllers/extrasController.tsx");

const router = express.Router(); // CALL to instantiate from a class - without this you just copy the class and nothing happens

router.post("/", createExtra);

router.get("/", getAllExtras);
// router.get("/:id", getRecipeByID);

router.patch("/:id", patchExtra);

router.delete("/:id", deleteExtra);

module.exports = router;
