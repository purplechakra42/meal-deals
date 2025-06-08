const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");

// recipe, which will be consumed by a pivot table with ingredients for a many-to-many relationship
const Recipe = sequelize.define(
  "Recipe",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    serves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "recipes",
    timestamps: false,
  }
);

module.exports = Recipe;
