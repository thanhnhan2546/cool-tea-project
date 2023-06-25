const express = require("express");
const {
  getOneRole,
  getAllRole,
  createRole,
  updateRole,
  deleteOrRestoreRole,
  deletePermanently,
} = require("../../controllers/role.controller");

const roleRouter = express.Router();

roleRouter.get("", getAllRole());
roleRouter.get("/:id", getOneRole());
roleRouter.post("", createRole());
roleRouter.put("/:id", updateRole());
roleRouter.delete("/delete/:id", deleteOrRestoreRole(true));
roleRouter.get("/restore/:id", deleteOrRestoreRole(false));
roleRouter.delete("/delete-permanetly/:id", deletePermanently());

module.exports = roleRouter;
