const express = require("express");
const {
  filterProducts,
  createProduct,
  getProductByCategory,
  updateProduct,
} = require("../../controllers/Product.controller");

const productRouter = express.Router();

productRouter.get("", filterProducts());
productRouter.post("", createProduct());
productRouter.get("/:idCate", getProductByCategory());
productRouter.put("/:id", updateProduct());

module.exports = productRouter;
