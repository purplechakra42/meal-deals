const sequelize = require("../config/db.tsx");
const { Aisle, Ingredient, Recipe, RecipeIngredient, MealDeals, Shopping } = require("../models/relationships.tsx");
const fs = require("fs");

const aislesData = JSON.parse(fs.readFileSync("../node-testing/data/aisles.JSON"));
const ingredientsData = JSON.parse(fs.readFileSync("../node-testing/data/ingredients.JSON"));
const recipeData = JSON.parse(fs.readFileSync("../node-testing/data/recipes.JSON"));
const recipeIngredientData = JSON.parse(fs.readFileSync("../node-testing/data/recipeingredients.JSON"));
const mealDealsData = JSON.parse(fs.readFileSync("../node-testing/data/mealdeals.JSON"));
const shoppingData = JSON.parse(fs.readFileSync("../node-testing/data/shopping.JSON"));

(async () => {
  try {
    await sequelize.sync({ force: true }); // to delete all tables and then rebuild

    await Aisle.bulkCreate(aislesData);
    await Ingredient.bulkCreate(ingredientsData);
    await Recipe.bulkCreate(recipeData);
    await RecipeIngredient.bulkCreate(recipeIngredientData);
    await MealDeals.bulkCreate(mealDealsData);
    // await Shopping.bulkCreate(shoppingData);

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
})();
