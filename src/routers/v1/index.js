const express = require("express");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");

const v1 = express.Router();

v1.use("/product", productRouter);
v1.use("/category", categoryRouter);
module.exports = v1;
