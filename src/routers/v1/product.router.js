const express = require("express");
const {
  filterProducts,
  createProduct,
} = require("../../controllers/Product.controller");

const productRouter = express.Router();

productRouter.get("", filterProducts());
productRouter.post("", createProduct());

module.exports = productRouter;
