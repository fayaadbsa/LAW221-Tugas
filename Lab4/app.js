const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database 🍃");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Hi! This is Fayaad OAuth Service 🔐");
});

require("./app/routes/mahasiswa.routes.js")(app);

app.listen(port, () => {
  console.log(`Fayaad OAuth Service ⚡`);
  console.log(`listening on port ${port}`);
});

// References:
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
// https://www.tutsmake.com/file-upload-in-mongodb-using-node-js/
// https://lo-victoria.com/build-rest-api-with-nodejs-upload-files-mongodb
