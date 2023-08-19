const express = require("express");
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteOrRestoreCategory,
  deletePermanently,
} = require("../../controllers/category.controller");
const authorization = require("../../middlewares/authorization");
const { verifyManager } = require("../../middlewares/checkRole");

const categoryRouter = express.Router();

categoryRouter.get("", getAllCategory());

categoryRouter.use(authorization);
categoryRouter.use(verifyManager);

categoryRouter.post("", createCategory());
categoryRouter.put("/:id", updateCategory());
categoryRouter.delete("/delete/:id", deleteOrRestoreCategory(true));
categoryRouter.get("/restore/:id", deleteOrRestoreCategory(false));
categoryRouter.delete("/delete-permanently/:id", deletePermanently);

module.exports = categoryRouter;
