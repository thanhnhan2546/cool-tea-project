const productService = require("../services/product.service");
const { response } = require("../helpers/response");
const {
  productValidate,
  updatePriceValidate,
} = require("../helpers/validation");
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

const deleteOreRestoreProduct = (hasDel) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const delOrRestore = await productService.deleteOreRestoreProduct(
        id,
        hasDel
      );
      res.status(200).json(response(delOrRestore));
    } catch (error) {
      next(error);
    }
  };
};

const deletePermanentlyProduct = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const delPer = await productService.deletePernamently(id);
      res.status(200).json(response(delPer));
    } catch (error) {
      next(error);
    }
  };
};
const updatePrice = () => {
  return async (req, res, next) => {
    try {
      const { idProduct, size } = req.params;
      const { price } = req.body;
      const validate = updatePriceValidate.validate({
        idProduct,
        size,
        price,
      });
      const err = validate?.error?.details[0];
      err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
      const update = await productService.updatePrice(idProduct, size, price);
      res.status(200).json(response(update));
    } catch (error) {
      next(error);
    }
  };
};

const insertSize = () => {
  return async (req, res, next) => {
    try {
      const validate = updatePriceValidate.validate(req.body);
      const err = validate?.error?.details[0];
      err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));

      const insertSize = await productService.insertSize(req.body);
      res.status(200).json(response(insertSize));
    } catch (error) {
      next(error);
    }
  };
};

const deleteSize = () => {
  return async (req, res, next) => {
    try {
      const { idProduct, size } = req.params;
      const deleteSize = await productService.deleteSize(idProduct, size);
      res.status(200).json(response(deleteSize));
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
  deleteOreRestoreProduct,
  deletePermanentlyProduct,
  updatePrice,
  insertSize,
  deleteSize,
};
