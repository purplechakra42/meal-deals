const express = require("express"); // import x as y
const sqlite3 = require("sqlite3");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; // if it's hosted somewhere, use the configured port, otherwise 3000

// allows parsing of jsons in the requests
app.use(express.json());
// // setting up database
// const dbPath = path.resolve(__dirname, "db.db");
// const db = new sqlite3.Database(dbPath);

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.db",
});

// define a shop. should have a name and a list of aisles
const Store = Sequelize.define(
  "Store",
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
  },
  {
    tableName: "stores",
    timestamps: false,
  }
);

// define an aisle. it should have a name and also a rough position in your path through the containing store. it should also store what store it's in, referencing the stores table
const Aisle = Sequelize.define(
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
    storeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Store, key: "id" },
    },
  },
  {
    tableName: "aisles",
    timestamps: false,
  }
);

// recipe
const Recipe = Sequelize.define(
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

// define an ingredient. you should always use an id as it's best practice - changing it is difficult, and strings are slower than integers.
const Ingredient = Sequelize.define(
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
      references: { model: Ingredient, key: "id" },
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Recipe, key: "id" },
    },
  },
  {
    tableName: "ingredients",
    timestamps: false,
  }
);
// meal deals

app.get("/", (req, res) => {
  res.send("Fuck you!");
});

// start server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
