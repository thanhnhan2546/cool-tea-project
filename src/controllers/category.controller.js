const { response } = require("../helpers/response");
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
          const createCate = await categoryService.createCategory(body);
          name.push(createCate.name);
        }
        res.status(200).json(response(name));
      } else {
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

const deleteCategory = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteCate = await categoryService.deleteCategory(id);
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
  deleteCategory,
};
