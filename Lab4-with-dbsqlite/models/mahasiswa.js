const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");


class Mahasiswa extends Model {}

Mahasiswa.init(
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING
    },
    pilihan1: {
      type: DataTypes.STRING
    },
    pilihan2: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "profile",
    timestamps: false
  }
);

module.exports = Mahasiswa;
