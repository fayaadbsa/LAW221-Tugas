const Mahasiswa = require("../models/mahasiswa.models.js");
const imageModel = require("../models/image.models.js");
const fs = require("fs")

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data tidak boleh kosong!",
    });
  }

  const mahasiswa = new Mahasiswa({
    nama: req.body.nama,
    alamat: req.body.alamat,
    npm: req.body.npm,
  });

  mahasiswa
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

exports.findAll = (req, res) => {
  Mahasiswa.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

exports.findOne = (req, res) => {
  Mahasiswa.findOne({
    npm: req.params.npm,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data tidak boleh kosong!",
    });
  }

  Mahasiswa.findOneAndUpdate(
    {
      npm: req.params.npm,
    },
    {
      nama: req.body.nama,
      alamat: req.body.alamat,
    },
    { new: true }
  )
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
          "Terjadi kesalahan dalam memperbarui mahasisa dengan npm" +
          req.params.npm,
      });
    });
};

exports.remove = (req, res) => {
  Mahasiswa.findOneAndRemove({
    npm: req.params.npm,
  })
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

exports.uploadImg = (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString("base64");
  var final_img = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_img, "base64"),
  };
  imageModel.create(final_img, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result.img.Buffer);
      console.log("Saved To database");
      res.contentType(final_img.contentType);
      res.send(final_img.image);
    }
  });
};
