const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");

const Extras = sequelize.define(
  "Extras",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bought: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "extras",
    timestamps: false,
  }
);

module.exports = Extras;
