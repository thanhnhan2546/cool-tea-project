const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");
const {
  idValidate,
  categoryAndRoleValidate,
} = require("../helpers/validation");
const roleService = require("../services/Role.service");

const getAllRole = () => {
  return async (req, res, next) => {
    try {
      const roles = await roleService.getAllRole();
      res.status(200).json(response(roles));
    } catch (error) {
      next(error);
    }
  };
};

const getOneRole = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const validate = idValidate.validate(id);
      const err = validate?.error?.details[0];
      err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
      const selectRole = await roleService.getOneRole(id);
      res.status(200).json(response(selectRole));
    } catch (error) {
      next(error);
    }
  };
};

const createRole = () => {
  return async (req, res, next) => {
    try {
      if (Array.isArray(req.body)) {
        let name = [];
        for (body of req.body) {
          const validate = categoryAndRoleValidate.validate(body);
          const err = validate?.error?.details[0];
          err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
          const createRole = await roleService.createRole(body);
          name.push(createRole.name);
        }
        res.status(200).json(response(name));
      } else {
        const validate = categoryAndRoleValidate.validate(req.body);
        const err = validate?.error?.details[0];
        err && next(new ErrorsApp(400, err?.message?.replace(/"/g, "")));
        const createRole = await roleService.createRole(req.body);
        res.status(200).json(response(createRole.name));
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getAllRole,
  getOneRole,
  createRole,
};
