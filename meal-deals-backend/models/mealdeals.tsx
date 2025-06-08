const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");
const Recipe = require("./recipe.tsx");

// meal deals
const MealDeals = sequelize.define(
  "MealDeals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      type: DataTypes.STRING, // monday, tuesday, etc.
      allowNull: false,
    },
    recipeID: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    serves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "mealdeals",
    timestamps: false,
  }
);

module.exports = MealDeals;
