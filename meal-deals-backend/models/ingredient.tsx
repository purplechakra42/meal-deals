const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");
const Aisle = require("./aisle.tsx");

// ingredient
const Ingredient = sequelize.define(
  "Ingredient",
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
    buy: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    aisleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Aisle,
        key: "id",
      },
    },
  },
  {
    tableName: "ingredients",
    timestamps: false,
  }
);

module.exports = Ingredient;
