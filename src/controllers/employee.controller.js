const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const {
  employeeUpdateValidate,
  employeeCreateValidate,
} = require("../helpers/validation");
const employeeService = require("../services/employee.service");

const getAllEmployee = () => {
  return async (req, res, next) => {
    try {
      const employees = await employeeService.getAllEmployee();
      res.status(200).json(response(employees));
    } catch (error) {
      next(error);
    }
  };
};

const createEmployee = () => {
  return async (req, res, next) => {
    try {
      const validate = employeeCreateValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const createEmployee = await employeeService.createEmployee(req.body);
      res.status(200).json(response(createEmployee));
    } catch (error) {
      next(error);
    }
  };
};

const updateEmployee = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const validate = employeeUpdateValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }

      const updateEmployee = await employeeService.updateEmployee(req.body, id);
      res.status(200).json(response(updateEmployee));
    } catch (error) {
      next(error);
    }
  };
};

const deleteOrRestoreEmployee = (hasDel) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await employeeService.deleteOrRestore(id, hasDel);
      res.status(200).json(response(employee));
    } catch (error) {
      next(error);
    }
  };
};

const deletePermanetly = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await employeeService.deletePermanently(id);
      res.status(200).json(response(`Delete Permanently id: ${id}`));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteOrRestoreEmployee,
  deletePermanetly,
};
