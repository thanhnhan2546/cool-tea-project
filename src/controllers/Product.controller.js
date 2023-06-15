const productService = require("../services/product.service");
const { response } = require("../helpers/response");
const Joi = require("joi");
const { productValidate } = require("../helpers/validation");
const { ErrorsApp } = require("../helpers/error");

const filterProducts = () => {
  return async (req, res, next) => {
    try {
      const product = await productService.filterProducts(req);
      res.status(200).json(response(product));
    } catch (error) {
      next(error);
    }
  };
};

const createProduct = () => {
  return async (req, res, next) => {
    try {
      const validate = productValidate.validate(req.body);
      const err = validate?.error?.details[0];
      if (err) {
        if (err.type.search("empty") !== -1) {
          next(new ErrorsApp(400, `${err.context.label} must not be empty`));
          return;
        } else {
          next(new ErrorsApp(400, `${err.context.label} is invalid`));
          return;
        }
      }
      const createProduct = await productService.createProduct(req.body);
      res.status(200).json(response(createProduct));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  filterProducts,
  createProduct,
};
