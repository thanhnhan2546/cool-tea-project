const express = require("express");
const productRouter = require("./product.router");

const v1 = express.Router();

v1.use("/products", productRouter);

module.exports = v1;
