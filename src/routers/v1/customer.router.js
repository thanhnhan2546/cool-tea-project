const express = require("express");
const {
  getAllCustomer,
  createCustomer,
  updateCustomer,
  deleteOrRestoreCustomer,
  deletePermanentlyCustomer,
} = require("../../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.get("", getAllCustomer());
customerRouter.post("", createCustomer());
customerRouter.put("/:id", updateCustomer());
customerRouter.delete("/delete/:id", deleteOrRestoreCustomer(true));
customerRouter.get("/restore/:id", deleteOrRestoreCustomer(false));
customerRouter.delete("/delete-permanetly/:id", deletePermanentlyCustomer());

module.exports = customerRouter;
