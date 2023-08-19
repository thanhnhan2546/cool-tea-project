const express = require("express");
const {
  getOneOrder,
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrRestoreOrder,
  deletePermanentlyOrder,
} = require("../../controllers/order.controller");
const { verifyManager } = require("../../middlewares/checkRole");

const orderRouter = express.Router();

orderRouter.get("", getAllOrder());
orderRouter.get("/:id", getOneOrder());
orderRouter.post("", createOrder());

orderRouter.use(verifyManager);

orderRouter.put("/:id", updateOrder());
orderRouter.delete("/delete/:id", deleteOrRestoreOrder(true));
orderRouter.get("/restore/:id", deleteOrRestoreOrder(false));
orderRouter.delete("/delete-permanently/:id", deletePermanentlyOrder());

module.exports = orderRouter;
