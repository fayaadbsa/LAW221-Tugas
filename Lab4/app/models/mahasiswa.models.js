const mongoose = require("mongoose");

const MahasiswaSchema = mongoose.Schema({
  nama: String,
  alamat: String,
  npm: String,
});

module.exports = mongoose.model("Mahasiswa", MahasiswaSchema);
