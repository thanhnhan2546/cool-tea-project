const express = require("express");
const {
  getOneRole,
  getAllRole,
  createRole,
} = require("../../controllers/role.controller");

const roleRouter = express.Router();

roleRouter.get("", getAllRole());
roleRouter.get("/:id", getOneRole());
roleRouter.post("", createRole());

module.exports = roleRouter;
