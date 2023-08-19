const jwt = require("jsonwebtoken");
const { ErrorsApp } = require("../helpers/error");
const { KEY_SERCRET } = require("../config/env");

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new ErrorsApp(401, "Require authorization");
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, KEY_SERCRET, (err, user) => {
    if (err) throw new ErrorsApp(401, "token maybe expired or invalid");
    req.user = user;
    next();
  });
};

module.exports = authorization;
