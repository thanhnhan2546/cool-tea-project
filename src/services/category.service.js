const { ErrorsApp } = require("../helpers/error");
const { Category } = require("../models");

class CategoryService {
  async getAllCategory() {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
  async getOneCategory(id) {
    try {
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      throw error;
    }
  }
  async createCategory(category) {
    try {
      const { name } = category;
      console.log("name: ", name);
      const selectCate = await Category.findOne({
        where: { name },
      });
      console.log("selectCate: ", selectCate);
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
      await Category.update(category, {
        where: { id },
      });
      return await this.getOneCategory(id);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategory(id) {
    try {
      const selectCate = await this.getOneCategory(id);
      if (!selectCate) {
        throw new ErrorsApp(400, "Category is not existed");
      }
      const deleteCate = await Category.destroy({ where: { id } });
      return deleteCate;
    } catch (error) {
      throw error;
    }
  }
}

const categoryService = new CategoryService();
module.exports = categoryService;
