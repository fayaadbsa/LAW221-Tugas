const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbconfig");

class Mahasiswa extends Model {}

Mahasiswa.init(
  {
    npm: {
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "profile",
    timestamps: false,
  }
);

module.exports = Mahasiswa;
