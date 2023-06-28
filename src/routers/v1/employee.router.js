const express = require("express");
const {
  createEmployee,
  getAllEmployee,
  updateEmployee,
  deleteOrRestoreEmployee,
  deletePermanetly,
} = require("../../controllers/employee.controller");

const employeeRouter = express.Router();

employeeRouter.get("", getAllEmployee());
employeeRouter.post("", createEmployee());
employeeRouter.put("/:id", updateEmployee());
employeeRouter.delete("/delete/:id", deleteOrRestoreEmployee(true));
employeeRouter.get("/restore/:id", deleteOrRestoreEmployee(false));
employeeRouter.delete("/delete-permanently/:id", deletePermanetly());

module.exports = employeeRouter;
