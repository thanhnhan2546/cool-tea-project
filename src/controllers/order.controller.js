const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const { createOrderValidate } = require("../helpers/validation");
const orderService = require("../services/order.service");

const getAllOrder = () => {
  return async (req, res, next) => {
    try {
      const orders = await orderService.getAllOrder();
      res.status(200).json(response(orders));
    } catch (error) {
      next(error);
    }
  };
};

const getOneOrder = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOneOrder(id);
      res.status(200).json(response(order));
    } catch (error) {
      next(error);
    }
  };
};

const createOrder = () => {
  return async (req, res, next) => {
    try {
      const validate = createOrderValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const createOrder = await orderService.createOrder(req.body);
      res.status(200).json(response(createOrder));
    } catch (error) {
      next(error);
    }
  };
};

const updateOrder = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const validate = createOrderValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const udpateOrder = await orderService.updateOrder(id, req.body);
      res.status(200).json(response(updateOrder));
    } catch (error) {
      next(error);
    }
  };
};

const deleteOrRestoreOrder = (hasDel) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const delOrRestore = await orderService.deleteOrRestoreOrder(id, hasDel);
      res.status(200).json(response(delOrRestore));
    } catch (error) {
      next(error);
    }
  };
};

const deletePermanentlyOrder = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const delPer = await orderService.deletePermanentlyOrder(id);
      res.status(200).json(response(delPer));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getAllOrder,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrRestoreOrder,
  deletePermanentlyOrder,
};
