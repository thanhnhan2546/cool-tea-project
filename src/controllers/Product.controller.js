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
const getProductByCategory = () => {
  return async (req, res, next) => {
    try {
      const { idCate } = req.params;
      const products = await productService.getProductByCategory(idCate);
      res.status(200).json(response(products));
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
      err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));

      const createProduct = await productService.createProduct(req.body);
      res.status(200).json(response(createProduct));
    } catch (error) {
      next(error);
    }
  };
};

const updateProduct = () => {
  return async (req, res, next) => {
    try {
      const { body, params } = req;
      const { id } = params;
      const updateProduct = await productService.updateProduct(body, id);
      res.status(200).json(response(updateProduct));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  filterProducts,
  createProduct,
  getProductByCategory,
  updateProduct,
};
