const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./dbconfig");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const port = 48433; // port free 4
// const port = 8080; 

sequelize.sync({ force: true }).then(async () => {
  console.log("database is ready 👍");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi! This is Fayaad CRUD Service 📦");
});

app.use("", mahasiswaRoutes.routes);

// require("./app/routes/mahasiswa.routes.js")(app);

app.listen(port, () => {
  console.log(`Fayaad CRUD Service ⚡`);
  console.log(`listening on port ${port}`);
});

// References:
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
// https://www.tutsmake.com/file-upload-in-mongodb-using-node-js/
// https://lo-victoria.com/build-rest-api-with-nodejs-upload-files-mongodb
