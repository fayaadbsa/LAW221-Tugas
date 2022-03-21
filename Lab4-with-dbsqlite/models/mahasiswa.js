const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");


class Mahasiswa extends Model {}

Mahasiswa.init(
  {
    nama: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.STRING
    },
    npm: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: "profile",
    timestamps: false
  }
);

module.exports = Mahasiswa;
