const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");
const RecipeIngredient = require("./recipeingredient.tsx");
const MealDeals = require("./mealdeals.tsx");

const Shopping = sequelize.define(
  "Shopping",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    need: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    bought: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "shopping",
    timestamps: false,
  }
);

module.exports = Shopping;
