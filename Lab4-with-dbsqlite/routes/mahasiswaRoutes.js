const express = require("express");
const mahasiswa = require("../controller/mahasiswaController");

const router = express.Router();

router.post("/mahasiswa", mahasiswa.create);

router.get("/mahasiswa", mahasiswa.findAll);

router.get("/mahasiswa/:npm", mahasiswa.findOne);

router.put("/mahasiswa/:npm", mahasiswa.update);

router.delete("/mahasiswa/:npm", mahasiswa.remove);

module.exports = {
  routes: router
};
