const { ProductPrices } = require("../models");

class ProductPriceService {
  async getOne(idProduct, size) {
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
    console.log("price: ", price);
    try {
      const createPrice = await ProductPrices.create(price);
      return createPrice;
    } catch (error) {
      throw error;
    }
  }
}

const productPriceService = new ProductPriceService();

module.exports = productPriceService;
