const { currentTime } = require("../config/config");
const { ErrorsApp } = require("../helpers/error");
const { Orders, OrderDetails } = require("../models");
const customerService = require("./customer.service");
const employeeService = require("./employee.service");
const orderDetailService = require("./orderDetail.service");
const productService = require("./product.service");

class OrderService {
  async getAllOrder() {
    try {
      const orders = await Orders.findAll({
        where: {
          deleted: false,
        },
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getOneOrder(id) {
    try {
      const order = await Orders.findByPk(id);
      if (!order) {
        throw new ErrorsApp(400, "Order is not existed");
      }
      return order.dataValues;
    } catch (error) {
      throw error;
    }
  }

  async checkTotalPriceAndQuantity(price, quantity, details, extra) {
    try {
      let totalPrice = 0;
      let totalQuantity = 0;
      for (let detail of details) {
        totalQuantity += detail.amount;
        const size = detail.size || "no size";
        const pPrice = await productService.getOneProductPrice(
          detail.idProduct,
          size
        );
        totalPrice += pPrice.price * detail.amount;
      }
      if (extra) {
        for (let e of extra) {
          const amount = e.amount || 1;
          totalQuantity += amount;
          const pPrice = await productService.getOneProductPrice(
            e.idProduct,
            "no size"
          );
          totalPrice += e.price ? e.price * amount : pPrice.price * amount;
        }
      }
      if (totalPrice !== price || totalQuantity != quantity) {
        throw new ErrorsApp(
          400,
          `totalPrice or totalQuantity is invalid, totalPrice is ${totalPrice}, totalQuantity is ${totalQuantity}`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async checkDetailsAndExtra(details, extra) {
    try {
      for (let detail of details) {
        const size = detail.size || "no size";
        const pPrice = await productService.getOneProductPrice(
          detail.idProduct,
          size
        );
        if (!pPrice) {
          throw new ErrorsApp(
            400,
            `id ${detail.idProduct} in details is not existed`
          );
        }
      }
      if (extra) {
        for (let e of extra) {
          const pPrice = await productService.getOneProductPrice(
            e.idProduct,
            "no size"
          );
          if (!pPrice) {
            throw new ErrorsApp(
              400,
              `id ${e.idProduct} in extra is not exsted`
            );
          }
          if (!e.price && pPrice.price === -1) {
            throw new ErrorsApp(
              400,
              `id ${e.idProduct} in extra must be price`
            );
          }
        }
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async createOrderDetail(order, id) {
    try {
      for (let detail of order.details) {
        const size = detail.size || "no size";
        const pPrice = await productService.getOneProductPrice(
          detail.idProduct,
          size
        );
        const orderDetail = {
          idOrder: id,
          idProduct: detail.idProduct,
          amount: detail.amount,
          totalPrice: detail.amount * pPrice.price,
        };

        const createDetail = await orderDetailService.createOrderDetail(
          orderDetail
        );
      }
      if (order.extra) {
        for (let extra of order.extra) {
          const pPrice = await productService.getOneProductPrice(
            extra.idProduct,
            "no size"
          );
          if (!extra.price) {
            extra = {
              ...extra,
              price: pPrice.price,
            };
          }
          extra = {
            ...extra,
            idOrder: id,
            amount: extra.amount || 1,
          };
          extra = {
            ...extra,
            totalPrice: extra.amount * extra.price,
          };
          await orderDetailService.createOrderDetail(extra);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async createOrder(order) {
    try {
      await customerService.getOneCustomer(order.idCustomer);
      await employeeService.getOneEmployee(order.idEmployee);
      await this.checkDetailsAndExtra(order.details, order?.extra);
      console.log("object");
      await this.checkTotalPriceAndQuantity(
        order.totalPrice,
        order.totalQuantity,
        order.details,
        order?.extra
      );

      const createOrder = await Orders.create(order);

      await this.createOrderDetail(order, createOrder.id);
      return createOrder;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id, order) {
    try {
      const selectOrder = await this.getOneOrder(id);
      await this.checkDetailsAndExtra(order.details, order?.extra);
      await this.checkTotalPriceAndQuantity(
        order.totalPrice,
        order.totalQuantity,
        order.details,
        order?.extra
      );
      await OrderDetails.destroy({ where: { idOrder: id } });
      await this.createOrderDetail(order, id);
      order = {
        ...order,
        updatedAt: currentTime,
      };
      await Orders.update(order, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteOrRestoreOrder(id, hasDel) {
    try {
      const selectOrder = await this.getOneOrder(id);
      if (hasDel == selectOrder.deleted) {
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

      const deleteCate = await Orders.update(del, { where: { id } });
      await OrderDetails.update(del, {
        where: { idOrder: id },
      });
      return hasDel ? "Delete Success" : "Restore success";
    } catch (error) {
      throw error;
    }
  }

  async deletePermanentlyOrder(id) {
    try {
      await this.getOneOrder(id);
      await OrderDetails.destroy({ where: { idOrder: id } });
      await Orders.destroy({ where: { id } });

      return "Delete Permanently Success";
    } catch (error) {}
  }
}

const orderService = new OrderService();
module.exports = orderService;
