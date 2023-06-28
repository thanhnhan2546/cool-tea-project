const { currentTime } = require("../config/config");
const { ErrorsApp } = require("../helpers/error");
const { Roles, Employees } = require("../models");

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

  async updateRole(role, id) {
    try {
      await this.getOneRole(id);

      role = {
        ...role,
        updatedAt: currentTime,
      };
      await Roles.update(role, {
        where: { id },
      });

      return await this.getOneRole(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrRestoreRole(id, hasDel) {
    try {
      const selectRole = await this.getOneRole(id);
      if (hasDel == selectRole.deleted) {
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
      await Employees.update(del, { where: { idRole: id } });
      await Roles.update(del, { where: { id } });

      return "Success";
    } catch (error) {
      throw error;
    }
  }

  async deletePermanently(id) {
    try {
      await this.getOneRole(id);
      await Employees.destroy({
        where: { idRole: id },
      });
      await Roles.destroy({
        where: { id },
      });
      return "Success";
    } catch (error) {
      throw error;
    }
  }
}

const roleService = new RoleService();
module.exports = roleService;
