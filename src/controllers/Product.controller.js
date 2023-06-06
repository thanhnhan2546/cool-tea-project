const productService = require("../services/product.service");
const { response } = require("../helpers/response");

const filterProducts = () => {
  return async (req, res, next) => {
    try {
      const payload = productService.filterProducts(req);
      res.status(200).json(response(payload));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  filterProducts,
};
