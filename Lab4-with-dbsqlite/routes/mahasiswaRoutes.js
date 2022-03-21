const express = require("express");
const mahasiswa = require("../controller/mahasiswaController");

const router = express.Router();

router.post("/mahasiswa", mahasiswa.create);

router.get("/mahasiswa", mahasiswa.findAll);

router.get("/mahasiswa/:id", mahasiswa.findOne);

router.put("/mahasiswa/:id", mahasiswa.update);

router.delete("/mahasiswa/:id", mahasiswa.remove);

module.exports = {
  routes: router
};
