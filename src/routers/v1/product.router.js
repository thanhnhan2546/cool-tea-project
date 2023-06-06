const express = require("express");
const { filterProducts } = require("../../controllers/Product.controller");

const productRouter = express.Router();

productRouter.get("", filterProducts());

module.exports = productRouter;
