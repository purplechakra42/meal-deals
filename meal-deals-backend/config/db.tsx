const { Sequelize } = require("sequelize");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

// // new Sequelize instance [SQLite]
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: path.resolve(__dirname, "../db.sqlite"),
// });

// new instance [PostgreSQL]
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});

// export the instance
module.exports = sequelize;
