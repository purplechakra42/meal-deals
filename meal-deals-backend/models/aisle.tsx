const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.tsx");

// always use an id as it's best practice - changing it is difficult, and strings are slower than integers
// aisle, with a name and a rough position the path through the store
const Aisle = sequelize.define(
  "Aisle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "aisles",
    timestamps: false,
  }
);

// export default Aisle;
module.exports = Aisle;
