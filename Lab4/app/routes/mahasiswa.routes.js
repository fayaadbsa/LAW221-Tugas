const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = (app) => {
  const mahasiswa = require("../controller/mahasiswa.controller.js");

  app.post("/mahasiswa", mahasiswa.create);

  app.get("/mahasiswa", mahasiswa.findAll);

  app.get("/mahasiswa/:npm", mahasiswa.findOne);

  app.put("/mahasiswa/:npm", mahasiswa.update);

  app.delete("/mahasiswa/:npm", mahasiswa.remove);

  app.delete("/mahasiswa/:npm", mahasiswa.remove);

  app.post("/uploadImg", upload.single("img"), mahasiswa.uploadImg);
};
