const express = require("express");
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.get("", getAllCategory());
categoryRouter.post("", createCategory());
categoryRouter.put("/:id", updateCategory());
categoryRouter.delete("/:id", deleteCategory());

module.exports = categoryRouter;
