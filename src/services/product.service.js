const { Op, literal } = require("sequelize");
const { Products, ProductPrices } = require("../models");
const categoryService = require("./category.service");
const { ErrorsApp } = require("../helpers/error");
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
        deleted: false,
      };

      const { rows, count } = await Products.findAndCountAll({
        where,
        limit,
        offset,
        order: literal(
          `CONVERT(${sortBy} USING utf8mb4) COLLATE utf8mb4_unicode_ci ${sortOrder}`
        ),
        attributes: { exclude: ["deleted"] },
        include: {
          model: ProductPrices,
          as: "prices",
        },
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
      // console.log(category.hasSize);
      for (let p of product.prices) {
        if (category.hasSize && p.size !== "M" && p.size !== "L") {
          return false;
        }

        if (
          !category.hasSize &&
          (p.size === "M" || p.size === "L" || product.prices.length > 1)
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const checkSize = await this.checkCateAndHasSize(product);
      if (!checkSize) {
        throw new ErrorsApp(400, "Prices is invalid");
      }
      const checkName = await Products.findOne({
        where: {
          name: product.name,
        },
      });

      if (checkName) {
        throw new ErrorsApp(400, "Product name is existed");
      }
      const createProduct = await Products.create(product);

      for (let prices of product.prices) {
        const createPrice = {
          idProduct: createProduct.dataValues.id,
          size: prices.size,
          price: prices.price,
        };
        await this.createPrice(createPrice);
      }

      return createProduct.dataValues;
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
  async deleteOreRestoreProduct(id, hasDel) {
    try {
      const selectProduct = await this.getOneProduct(id);
      if (!selectProduct) {
        throw new ErrorsApp(400, "Product is not existed");
      }
      if (
        (hasDel && selectProduct.deleted) ||
        (!hasDel && !selectProduct.deleted)
      ) {
        throw new ErrorsApp(400, "Request is invalid");
      }
      let del = {
        deleted: hasDel,
      };

      if (hasDel) {
        del = {
          ...del,
          deletedAt: currentTime,
        };
      }
      await Products.update(del, {
        where: {
          id,
        },
      });
      return `Success `;
    } catch (error) {
      throw error;
    }
  }

  async deletePernamently(id) {
    try {
      const selectProduct = await this.getOneProduct(id);
      if (!selectProduct) {
        throw new ErrorsApp(400, "Product is not existed");
      }
      await ProductPrices.destroy({
        where: {
          idProduct: id,
        },
      });
      await Products.destroy({
        where: {
          id,
        },
      });
      return "Delete success";
    } catch (error) {
      throw error;
    }
  }
  async getOneProductPrice(idProduct, size) {
    try {
      const getOnePrice = await ProductPrices.findOne({
        where: {
          idProduct,
          size,
        },
      });

      return getOnePrice;
    } catch (error) {
      throw error;
    }
  }
  async createPrice(price) {
    try {
      const createPrice = await ProductPrices.create(price);
      return createPrice;
    } catch (error) {
      throw error;
    }
  }

  async updatePrice(id, size, price) {
    try {
      await this.getOneProduct(id);
      const getPrice = await this.getOneProductPrice(id, size);
      if (!getPrice) {
        throw new ErrorsApp(400, "Size of product is existed");
      }
      await ProductPrices.update(
        { price, updatedAt: currentTime },
        {
          where: {
            idProduct: id,
            size,
          },
        }
      );
      return await this.getOneProductPrice(id, size);
    } catch (error) {
      throw error;
    }
  }

  async insertSize(productSize) {
    try {
      const { idProduct, size } = productSize;
      await this.getOneProduct(idProduct);

      const oneSize = await this.getOneProductPrice(idProduct, size);
      if (oneSize) {
        throw new ErrorsApp(400, "Size of Product is existed");
      }

      const insertSize = await ProductPrices.create(productSize);
      return insertSize;
    } catch (error) {
      throw error;
    }
  }

  async deleteSize(idProduct, size) {
    try {
      await this.getOneProduct(idProduct);
      const selectPrice = await this.getOneProductPrice(idProduct, size);
      if (!selectPrice) {
        throw new ErrorsApp(400, "Size of product is not extisted");
      }

      await ProductPrices.destroy({
        where: {
          idProduct,
          size,
        },
      });

      return "Delete Success";
    } catch (error) {
      throw error;
    }
  }
}

const productService = new ProductsService();

module.exports = productService;
