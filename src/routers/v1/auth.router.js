const express = require("express");
const {
  loginCustomer,
  loginEmployee,
} = require("../../controllers/auth.controller");

const auth = express.Router();

auth.post("/customer", loginCustomer());
auth.post("/employee", loginEmployee());

module.exports = auth;
