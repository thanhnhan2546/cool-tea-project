const { ErrorsApp } = require("../helpers/error");
const { Category, Products } = require("../models");
const { currentTime } = require("../config/config");

class CategoryService {
  async getAllCategory() {
    try {
      const categories = await Category.findAll({
        include: "products",
        where: {
          deleted: false,
        },
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }
  async getOneCategory(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new ErrorsApp(400, "Category is not existed");
      }

      return category.dataValues;
    } catch (error) {
      throw error;
    }
  }
  async createCategory(category) {
    try {
      const { name } = category;
      const selectCate = await Category.findOne({
        where: { name },
      });
      if (selectCate) {
        throw new ErrorsApp(400, "Category is existed");
      }
      const createCate = await Category.create(category);
      return createCate;
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(category, id) {
    try {
      const selectCate = await this.getOneCategory(id);
      if (!selectCate) {
        throw new ErrorsApp(400, "Category is not existed");
      }
      category = {
        ...category,
        updatedAt: currentTime,
      };
      await Category.update(category, {
        where: { id },
      });
      return await this.getOneCategory(id);
    } catch (error) {
      throw error;
    }
  }
  async deleteOrRestoreCategory(id, hasDel) {
    try {
      const selectCate = await this.getOneCategory(id);
      if (!selectCate) {
        throw new ErrorsApp(400, "Category is not existed");
      }
      if ((hasDel && selectCate.deleted) || (!hasDel && !selectCate.deleted)) {
        throw new ErrorsApp(400, "Request is invalid");
      }
      let deleted = {
        deleted: hasDel,
      };
      if (hasDel) {
        deleted = {
          ...deleted,
          deletedAt: currentTime,
        };
      }
      const deleteCate = await Category.update(deleted, { where: { id } });
      await Products.update(deleted, {
        where: { idCategory: id },
      });
      return deleteCate;
    } catch (error) {
      throw error;
    }
  }
  async deletePermanently(id) {
    try {
      const selectCate = await this.getOneCategory(id);
      if (!selectCate) {
        throw new ErrorsApp(400, "Category is not existed");
      }
      await Products.destroy({
        where: {
          idCategory: id,
        },
      });
      const deletePer = await Category.destroy({
        where: {
          id,
        },
      });

      return deletePer;
    } catch (error) {
      throw error;
    }
  }
}

const categoryService = new CategoryService();
module.exports = categoryService;
