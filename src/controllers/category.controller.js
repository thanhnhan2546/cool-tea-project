const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const { categoryValidate } = require("../helpers/validation");
const categoryService = require("../services/category.service");

const getAllCategory = () => {
  return async (req, res, next) => {
    try {
      const categories = await categoryService.getAllCategory();
      res.status(200).json(response(categories));
    } catch (error) {
      next(error);
    }
  };
};

const createCategory = () => {
  return async (req, res, next) => {
    try {
      if (Array.isArray(req.body)) {
        let name = [];
        for (body of req.body) {
          const validate = categoryValidate.validate(body);
          const err = validate?.error?.details[0];
          err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
          const createCate = await categoryService.createCategory(body);
          name.push(createCate.name);
        }
        res.status(200).json(response(name));
      } else {
        const validate = categoryValidate.validate(req.body);
        const err = validate?.error?.details[0];
        err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
        const createCate = await categoryService.createCategory(req.body);
        res.status(200).json(response(createCate.name));
      }
    } catch (error) {
      next(error);
    }
  };
};

const updateCategory = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateCate = await categoryService.updateCategory(req.body, id);
      res.status(200).json(response(updateCate));
    } catch (error) {
      next(error);
    }
  };
};

const deleteOrRestoreCategory = (hasDel) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteCate = await categoryService.deleteOrRestoreCategory(
        id,
        hasDel
      );
      res.status(200).json(response(id));
    } catch (error) {
      next(error);
    }
  };
};

const deletePermanently = () => {
  return async (req, res, nex) => {
    try {
      const { id } = req.params;
      await categoryService.deletePermanently(id);
      res.status(200).json(response(id));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteOrRestoreCategory,
  deletePermanently,
};
