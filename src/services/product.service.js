const { Op } = require("sequelize");
const { Products } = require("../models");

class ProductsService {
  async filterProducts(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.qurey.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sorBy || "create_at";
    const sortOrder = req.query.sortOrder || "ASC";
    const searchQuery = req.query.search || "";

    try {
      const where = {
        productName: { [Op.like]: `%${searchQuery}%` },
      };

      const { rows, count } = await Products.findAndCountAll({
        where,
        limit,
        offset,
        order: sequelize.literal(
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
}

const productService = new ProductsService();

module.exports = productService;
