const { currentTime } = require("../config/config");
const { ErrorsApp } = require("../helpers/error");
const { OrderDetails } = require("../models");
const productService = require("./product.service");

class OrderDetailService {
  async getByBk(idOrder, idProduct) {
    try {
      const selectOne = OrderDetails.findOne({
        where: {
          idOrder,
          idProduct,
        },
      });
      if (selectOne) {
        return selectOne.dataValues;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  async getByKey(key, value) {
    try {
      const detail = await OrderDetails.findAll({
        where: { [key]: value },
      });
      return detail;
    } catch (error) {
      throw error;
    }
  }

  async createOrderDetail(orderDetail) {
    try {
      const { idOrder, idProduct } = orderDetail;
      const selectOne = await this.getByBk(idOrder, idProduct);
      if (selectOne) {
        throw new ErrorsApp(400, "Order already exists product");
      }
      await productService.getOneProduct(idProduct);
      const create = await OrderDetails.create(orderDetail);
      return create;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderDetail(orderDetail) {
    try {
      const { idOrder, idProduct } = orderDetail;
      const selectOne = await this.getByBk(idOrder, idProduct);
      if (!selectOne) {
        throw new ErrorsApp(400, "Product does not exist in order");
      }

      await OrderDetails.update(orderDetail, {
        where: {
          idOrder,
          idProduct,
        },
      });
      return "Success";
    } catch (error) {
      throw error;
    }
  }

  async deleteOrRestoreDetail(idOrder, idProduct, hasDel) {
    try {
      const selectOne = await this.getByBk(idOrder, idProduct);
      if (!selectOne) {
        throw new ErrorsApp(400, "Product does not exist in order");
      }
      if (hasDel == selectOne.deleted) {
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
      await OrderDetails.update(del, {
        where: {
          idOrder,
          idProduct,
        },
      });
      return hasDel ? "Delete Success" : "Restore Success";
    } catch (error) {
      throw error;
    }
  }

  async deletePermanently(idOrder, idProduct) {
    try {
      const selectOne = await this.getByBk(idOrder, idProduct);
      if (!selectOne) {
        throw new ErrorsApp(400, "Product does not exist in order");
      }
      await OrderDetails.destroy({
        where: {
          idOrder,
          idProduct,
        },
      });
      return "Delete Pernamently Success";
    } catch (error) {}
  }
}

const orderDetailService = new OrderDetailService();
module.exports = orderDetailService;
