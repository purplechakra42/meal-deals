const Aisle = require("./aisle.tsx");
const Ingredient = require("./ingredient.tsx");
const Recipe = require("./recipe.tsx");
const RecipeIngredient = require("./recipeingredient.tsx");
const MealDeals = require("./mealdeals.tsx");
const Shopping = require("./shopping.tsx");

Ingredient.belongsTo(Aisle, { foreignKey: "aisleID" });
Aisle.hasMany(Ingredient, { foreignKey: "aisleID" });

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

MealDeals.belongsTo(Recipe, { foreignKey: "recipeID" });
Recipe.hasMany(MealDeals, { foreignKey: "recipeID" });

MealDeals.belongsToMany(RecipeIngredient, { through: Shopping });
RecipeIngredient.belongsToMany(MealDeals, { through: Shopping });

module.exports = { Aisle, Ingredient, Recipe, RecipeIngredient, MealDeals, Shopping };
