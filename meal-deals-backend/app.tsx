const express = require("express"); // import x as y
// const sqlite3 = require("sqlite3");
const cors = require("cors");

const sequelize = require("./config/db.tsx");
const { Aisle, Ingredient, Recipe, RecipeIngredient, MealDeals, Shopping } = require("./models/relationships.tsx");
const Extras = require("./models/extras.tsx");

// declare the express app thingo
const app = express();
const port = process.env.PORT || 3000; // if it's hosted somewhere, use the configured port, otherwise 3000
// allows parsing of jsons in the requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// helps with domain conflicts (???)
// app.use(cors()); // allow anything
app.use(cors({ origin: "http://localhost:5173" })); // allow only this domain
// map routings of functions to endpoints
app.use("/aisles", require("./routes/aisleRoutes.tsx"));
app.use("/ingredients", require("./routes/ingredientRoutes.tsx"));
app.use("/recipes", require("./routes/recipeRoutes.tsx"));
app.use("/recipeIngredients", require("./routes/recipeIngredientRoutes.tsx"));
app.use("/mealdeals", require("./routes/mealdealsRoutes.tsx"));
app.use("/shopping", require("./routes/shoppingRoutes.tsx"));
app.use("/extras", require("./routes/extrasRoutes.tsx"));

// create/sync the database
(async () => {
  await sequelize.sync(); // sync database
  // await sequelize.sync({ force: true }); // recreate database

  // start server
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
})();
