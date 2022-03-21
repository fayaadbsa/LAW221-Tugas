const Mahasiswa = require("../models/mahasiswa");

const findAll = async (req, res) => {
  await Mahasiswa.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data tidak boleh kosong!",
    });
  }

  const mahasiswa = {
    nama: req.body.nama,
    pilihan1: req.body.pilihan1,
    pilihan2: req.body.pilihan2,
  };

  await Mahasiswa.create(mahasiswa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

const findOne = async (req, res) => {
  await Mahasiswa.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data tidak boleh kosong!",
    });
  }

  const mahasiswa = {
    nama: req.body.nama,
    pilihan1: req.body.pilihan1,
    pilihan2: req.body.pilihan2,
  };

  await Mahasiswa.update(mahasiswa, { where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan id " + req.params.id,
        });
      }
      return res.status(500).send({
        message:
          "Terjadi kesalahan dalam memperbarui mahasisa dengan id " +
          req.params.id,
      });
    });
};

const remove = async (req, res) => {
  await Mahasiswa.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan id " + req.params.id,
        });
      }
      res.send("Berhasil menghapus data!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan id " + req.params.id,
        });
      }
      return res.status(500).send({
        message:
          "Terjadi kesalahan dalam memperbarui mahasisa dengan id" +
          req.params.id,
      });
    });
};

module.exports = {
  findOne,
  findAll,
  create,
  update,
  remove,
};
