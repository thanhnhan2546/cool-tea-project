const { Op } = require("sequelize");
const { ErrorsApp } = require("../helpers/error");
const { Employees, Roles, sequelize } = require("../models");
const roleService = require("./Role.service");
const {
  generateIdEmployee,
  currentTime,
  hashPassword,
} = require("../config/config");

class EmployeeService {
  async getAllEmployee() {
    try {
      const employees = await Employees.findAll({
        where: {
          deleted: false,
        },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Roles,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });
      return employees;
    } catch (error) {
      throw error;
    }
  }

  async getOneEmployee(id) {
    try {
      const employee = await Employees.findByPk(id);
      if (!employee) {
        throw new ErrorsApp(400, "Employee is not existed");
      }
      return employee.dataValues;
    } catch (error) {
      throw error;
    }
  }
  async checkRole(idRole) {
    const oneRole = await roleService.getOneRole(idRole);
    switch (oneRole.name) {
      case "Admin":
        return "ad";
      case "Manager":
        return "mgr";
      case "Employee":
        return "ee";
    }
  }

  async createEmployee(employee) {
    try {
      const role = await this.checkRole(employee.idRole);
      //   console.log("role: ", role);
      const max = await Employees.findOne({
        where: {
          id: { [Op.like]: `%${role}%` },
        },
        attributes: [[sequelize.literal("MAX(SUBSTRING(id, -3))"), "max"]],
      });
      //   console.log("count: ", max.dataValues.max + 1);
      const id = generateIdEmployee(role, max.dataValues.max);
      employee = {
        ...employee,
        id,
        password: hashPassword(employee.password),
      };
      const createEmployee = await Employees.create(employee);
      return createEmployee;
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(employee, id) {
    try {
      await this.getOneEmployee(id);
      employee = {
        ...employee,
        updatedAt: currentTime,
      };
      await Employees.update(employee, {
        where: { id },
      });

      return await this.getOneEmployee(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrRestore(id, hasDel) {
    try {
      const selectEmployee = await this.getOneEmployee(id);
      if (hasDel == selectEmployee.deleted) {
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
      await Employees.update(del, {
        where: { id },
      });
      return hasDel ? "Delete Success" : "Restore Success";
    } catch (error) {
      throw error;
    }
  }

  async deletePermanently(id) {
    try {
      await this.getOneEmployee(id);
      await Employees.destroy({
        where: { id },
      });

      return "Delete Pernamently Success";
    } catch (error) {
      throw error;
    }
  }
}

const employeeService = new EmployeeService();
module.exports = employeeService;
