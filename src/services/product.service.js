const { Op, literal, Sequelize } = require("sequelize");
const { Products, ProductPrices } = require("../models");
const categoryService = require("./category.service");
const { ErrorsApp } = require("../helpers/error");
const productPriceService = require("./productPrice.service");
const { currentTime } = require("../config/config");

class ProductsService {
  async filterProducts(req) {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.qurey?.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req?.query?.sorBy || "created_at";
    const sortOrder = req?.query?.sortOrder || "ASC";
    const searchQuery = req?.query?.search || "";

    try {
      const where = {
        name: { [Op.like]: `%${searchQuery}%` },
      };

      const { rows, count } = await Products.findAndCountAll({
        where,
        limit,
        offset,
        order: literal(
          `CONVERT(${sortBy} USING utf8mb4) COLLATE utf8mb4_unicode_ci ${sortOrder}`
        ),
      });
      const totalPages = Math.ceil(count / limit);

      return {
        totalItems: count,
        totalPages,
        currentPage: page,
        data: rows,
      };
    } catch (error) {
      throw error;
    }
  }
  async getOneProduct(id) {
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        throw new ErrorsApp(400, "Product is not exitsed");
      }
      return product.dataValues;
    } catch (error) {
      throw error;
    }
  }
  async getProductByCategory(idCate) {
    try {
      const product = await Products.findAll({
        where: {
          idCategory: idCate,
        },
      });
      console.log("product", product.length);
      if (product?.length === 0) {
        throw new ErrorsApp(400, "Category is not existed");
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
  async checkCateAndHasSize(product) {
    try {
      const category = await categoryService.getOneCategory(
        product?.idCategory
      );
      if (category.hasSize && !product.prices) {
        throw new ErrorsApp(400, "product must have size");
      }
      if (!category.hasSize && !product.price) {
        throw new ErrorsApp(400, "category hasn't size and only price");
      }
      const checkName = await Products.findOne({
        where: {
          name: product.name,
        },
      });

      if (checkName) {
        throw new ErrorsApp(400, "product name is existed");
      }
      return category.hasSize;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const check = await this.checkCateAndHasSize(product);
      const createProduct = await Products.create(product);
      if (!check) {
        const price = {
          idProduct: createProduct.dataValues.id,
          size: product.size,
          price: product.price,
        };
        await productPriceService.createPrice(price);
      } else {
        for (let price of product.prices) {
          const createPrice = {
            idProduct: createProduct.dataValues.id,
            size: price.size,
            price: price.price,
          };
          await productPriceService.createPrice(createPrice);
        }
      }

      return createProduct.dataValues.name;
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(product, id) {
    try {
      const category = await categoryService.getOneCategory(
        product?.idCategory
      );

      const productPrev = await this.getOneProduct(id);
      const categoryPrev = await categoryService.getOneCategory(
        productPrev.idCategory
      );

      if (category.hasSize !== categoryPrev.hasSize) {
        throw new ErrorsApp(
          400,
          `Category of product previous ${
            categoryPrev.hasSize ? "has size" : "has not size"
          }, you can update category  ${
            category.hasSize ? "has size" : "has not size"
          } `
        );
      }
      product = {
        ...product,
        updatedAt: currentTime,
      };
      await Products.update(product, {
        where: {
          id,
        },
      });
      return "Update Success";
    } catch (error) {
      throw error;
    }
  }
}

const productService = new ProductsService();

module.exports = productService;
