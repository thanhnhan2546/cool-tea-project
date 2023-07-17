const express = require("express");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const uploadCloud = require("../../middlewares/cloudinary");
const { uploadImage } = require("../../controllers/uploadImage");
const roleRouter = require("./role.router");
const employeeRouter = require("./employee.router");
const customerRouter = require("./customer.router");
const orderRouter = require("./order.router");

const v1 = express.Router();
v1.post("/upload-image", uploadCloud.single("image"), uploadImage());
v1.use("/product", productRouter);
v1.use("/category", categoryRouter);
v1.use("/role", roleRouter);
v1.use("/employee", employeeRouter);
v1.use("/customer", customerRouter);
v1.use("/order", orderRouter);
module.exports = v1;
