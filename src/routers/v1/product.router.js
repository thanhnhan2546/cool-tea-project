const express = require("express");
const {
  filterProducts,
  createProduct,
  getProductByCategory,
  updateProduct,
  deleteOreRestoreProduct,
  deletePermanentlyProduct,
  updatePrice,
  insertSize,
  deleteSize,
} = require("../../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("", filterProducts());
productRouter.post("", createProduct());
productRouter.get("/:idCate", getProductByCategory());
productRouter.put("/:id", updateProduct());
productRouter.delete("/delete/:id", deleteOreRestoreProduct(true));
productRouter.get("/restore/:id", deleteOreRestoreProduct(false));
productRouter.delete("/delete-permanently/:id", deletePermanentlyProduct());

/*-----Price */
productRouter.put("/update-price/:idProduct/:size", updatePrice());
productRouter.post("/insert-size", insertSize());
productRouter.delete("/delete-size/:idProduct/:size", deleteSize());

module.exports = productRouter;
