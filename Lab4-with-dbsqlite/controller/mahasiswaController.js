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
    alamat: req.body.alamat,
    npm: req.body.npm,
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
  await Mahasiswa.findOne({ where: { npm: req.params.npm } })
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
    alamat: req.body.alamat,
  };

  await Mahasiswa.update(mahasiswa, { where: { npm: req.params.npm } })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan npm " + req.params.npm,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan npm " + req.params.npm,
        });
      }
      return res.status(500).send({
        message:
          "Terjadi kesalahan dalam memperbarui mahasisa dengan npm " +
          req.params.npm,
      });
    });
};

const remove = async (req, res) => {
  await Mahasiswa.findOne({ npm: req.params.npm })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan npm " + req.params.npm,
        });
      }
      res.send("Berhasil menghapus data!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data tidak ditemukan dengan npm " + req.params.npm,
        });
      }
      return res.status(500).send({
        message:
          "Terjadi kesalahan dalam memperbarui mahasisa dengan npm" +
          req.params.npm,
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
