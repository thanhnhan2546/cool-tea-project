const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const {
  loginCustomerValidate,
  loginEmployeeValidate,
} = require("../helpers/validation");
const authService = require("../services/auth.service");

const loginCustomer = () => {
  return async (req, res, next) => {
    try {
      const validate = loginCustomerValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }
      const login = await authService.loginCustomer(req.body);

      res.status(200).json(response(login));
    } catch (error) {
      next(error);
    }
  };
};
const loginEmployee = () => {
  return async (req, res, next) => {
    try {
      const validate = loginEmployeeValidate.validate(req.body);
      const err = validate?.error;
      if (err) {
        return next(new ErrorsApp(400, err?.message.replace(/"/g, "")));
      }
      const login = await authService.loginEmployee(req.body);

      res.status(200).json(response(login));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  loginCustomer,
  loginEmployee,
  changePassCustomer,
};
