const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tugas4db", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite"
});

module.exports = sequelize;