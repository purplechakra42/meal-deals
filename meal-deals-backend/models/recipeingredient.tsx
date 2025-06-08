const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");

// pivot table to associate ingredients with recipes
const RecipeIngredient = sequelize.define(
  "RecipeIngredient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    unit: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "recipeingredients",
    timestamps: false,
  }
);

module.exports = RecipeIngredient;
