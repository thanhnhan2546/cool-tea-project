const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const { customerCreateValidate } = require("../helpers/validation");
const customerService = require("../services/customer.service");

const getAllCustomer = () => {
  return async (req, res, next) => {
    try {
      const customers = await customerService.getAllCustomer();
      res.status(200).json(response(customers));
    } catch (error) {
      next(error);
    }
  };
};

const createCustomer = () => {
  return async (req, res, next) => {
    try {
      const validate = customerCreateValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const createCus = await customerService.createCustomer(req.body);
      res.status(200).json(response(createCus));
    } catch (error) {
      next(error);
    }
  };
};

const updateCustomer = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const validate = customerCreateValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const updateCus = await customerService.updateCustomer(req.body, id);
      res.status(200).json(response(updateCus));
    } catch (error) {
      next(error);
    }
  };
};

const deleteOrRestoreCustomer = (hasDel) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const delCus = await customerService.deleteOrRestoreCus(id, hasDel);
      res.status(200).json(response(delCus));
    } catch (error) {
      next(error);
    }
  };
};

const deletePermanentlyCustomer = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await customerService.deletePermanently(id);
      res.status(200).json(response(`Delete Permanently id: ${id}`));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getAllCustomer,
  createCustomer,
  updateCustomer,
  deleteOrRestoreCustomer,
  deletePermanentlyCustomer,
};
