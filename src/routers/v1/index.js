const express = require("express");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const uploadCloud = require("../../middlewares/cloudinary");
const { uploadImage } = require("../../controllers/uploadImage");
const roleRouter = require("./role.router");
const employeeRouter = require("./employee.router");
const customerRouter = require("./customer.router");
const orderRouter = require("./order.router");
const auth = require("./auth.router");
const authorization = require("../../middlewares/authorization");
const { verifyAdmin } = require("../../middlewares/checkRole");
const { changePassCustomer } = require("../../controllers/auth.controller");

const v1 = express.Router();
// upload image
v1.post("/upload-image", uploadCloud.single("image"), uploadImage());

// auth
v1.use("/login", auth);
v1.use("/product", productRouter);
v1.use("/category", categoryRouter);
v1.use("/customer", customerRouter);
v1.use(authorization);

v1.use("/role", verifyAdmin, roleRouter);
v1.use("/employee", verifyAdmin, employeeRouter);
v1.use("/order", orderRouter);

module.exports = v1;
