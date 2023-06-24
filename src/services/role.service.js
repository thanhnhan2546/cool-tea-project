const { ErrorsApp } = require("../helpers/error");
const { Roles } = require("../models");

class RoleService {
  async getAllRole() {
    try {
      const roles = await Roles.findAll({
        where: {
          deleted: false,
        },
        attributes: { exclude: ["deleted"] },
      });
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getOneRole(id) {
    try {
      const role = await Roles.findByPk(id);
      if (!role) {
        throw new ErrorsApp(400, "Role is not existed");
      }

      return role.dataValues;
    } catch (error) {
      throw error;
    }
  }

  async createRole(role) {
    try {
      const { name } = role;
      const selectRole = await Roles.findOne({
        where: { name },
      });
      if (selectRole) {
        throw new ErrorsApp(400, "Role is existed");
      }
      const createRole = await Roles.create(role);
      return createRole;
    } catch (error) {
      throw error;
    }
  }
}

const roleService = new RoleService();
module.exports = roleService;
