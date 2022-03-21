const crypto = require("crypto");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// VARIABLES

const port = 28433; // port free 1
const APP_CLIENT_ID = "fayaadcid";
const APP_CLIENT_SECRET = "fayaadcsecret";
const APP_NPM_FAYAAD = "1906398433";
const APP_USERS = [
  {
    user_id: "useryadid",
    username: "useryad",
    password: "passyad",
    full_name: "muhammad fayaad",
    npm: APP_NPM_FAYAAD,
    access_token: "",
    refresh_token: "",
    status_token: false,
    timeout_id: "",
  },
];

// FUNCTIONS

const generateToken = (salt = 10) => {
  const str = (Date.now() + Math.floor(Math.random() * 100)).toString() + salt;
  const shasum = crypto.createHash("sha1");
  return shasum.update(str).digest("hex");
};

const auth = (user, password, grant_type, client_id, client_secret) => {
  var allow = false;

  if (
    user &&
    user.password === password &&
    APP_CLIENT_ID === client_id &&
    APP_CLIENT_SECRET === client_secret &&
    grant_type === "password"
  ) {
    allow = true;
  }

  return new Promise((res, rej) => {
    allow ? res() : rej();
  });
};

const getResource = (authToken) => {
  const type = authToken.split(" ")[0];
  const token = authToken.split(" ")[1];
  const user = APP_USERS.find((user) => user.access_token === token);
  var allow = false;

  if (type === "Bearer" && user) {
    allow = true;
  }

  return new Promise((res, rej) => {
    allow ? res(user) : rej();
  });
};

// ROUTES

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hi! This is Fayaad OAuth Service 🔐");
});

app.post("/oauth/token", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const grant_type = req.body.grant_type;
  const client_id = req.body.client_id;
  const client_secret = req.body.client_secret;

  const user = APP_USERS.find((user) => user.username === username);

  auth(user, password, grant_type, client_id, client_secret)
    .then(() => {
      clearTimeout(user.timeout_id);
      user.access_token = generateToken(20);
      user.refresh_token = generateToken(30);
      user.status_token = true;

      console.log(`Welcome ${user.username}!`);
      const timeout_id = setTimeout(() => {
        user.status_token = false;
        console.log(`${user.username} has logged out...`);
      }, 300000);

      user.timeout_id = timeout_id;

      res.json({
        access_token: user.access_token,
        expires_in: 300,
        token_type: "Bearer",
        scope: null,
        refresh_token: user.refresh_token,
      });
    })
    .catch(() => {
      res.status(401);
      res.send({
        error: "invalid_request",
        error_description: "ada kesalahan masbro! 💀",
      });
    });
});

app.post("/oauth/resource", (req, res) => {
  const authToken = req.headers.authorization;
  getResource(authToken)
    .then((user) => {
      res.json({
        access_token: user.access_token,
        client_id: APP_CLIENT_ID,
        user_id: user.user_id,
        full_name: user.full_name,
        npm: user.npm,
        expires: null,
        refresh_token: user.refresh_token,
      });
    })
    .catch(() => {
      res.status(401);
      res.send({
        error: "invalid_token",
        error_description: "Token salah masbro! 💔",
      });
    });
});

app.listen(port, () => {
  console.log(`Fayaad OAuth Service ⚡`);
  console.log(`listening on port ${port}`);
});
