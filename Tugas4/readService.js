const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./dbconfig");
const Mahasiswa = require("./mahasiswa");
const app = express();
const port = 38433; // port free 3
// const port = 8080;

sequelize.sync({ force: true }).then(async () => {
  console.log("database is ready 👍");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi! This is Fayaad Read Service 📦");
});

app.get("/read/:npm", async (req, res) => {
  await Mahasiswa.findOne({ where: { npm: req.params.npm } })
    .then((data) => {
      res.json({
        status: "OK",
        npm: data.npm,
        nama: data.nama,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
});

app.listen(port, () => {
  console.log(`Fayaad Read Service ⚡`);
  console.log(`listening on port ${port}`);
});
