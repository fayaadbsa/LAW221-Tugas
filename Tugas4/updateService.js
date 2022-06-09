const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./dbconfig");
const Mahasiswa = require("./mahasiswa");
const app = express();
const port = 18433; // port free 4
// const port = 8081;

sequelize.sync({ force: true }).then(async () => {
  console.log("database is ready 👍");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi! This is Fayaad Update Service 📦");
});

app.post("/update", async (req, res) => {
  await Mahasiswa.create({ npm: req.body.npm, nama: req.body.nama })
    .then((data) => {
      res.json({
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan 😢",
      });
    });
});

app.listen(port, () => {
  console.log(`Fayaad Update Service ⚡`);
  console.log(`listening on port ${port}`);
});
