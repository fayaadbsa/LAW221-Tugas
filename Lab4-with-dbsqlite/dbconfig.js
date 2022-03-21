const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lab4db", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite"
});

module.exports = sequelize;