const { ErrorsApp } = require("../helpers/error");
const { Customers, Employees, Roles } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { KEY_SERCRET } = require("../config/env");

class AuthService {
  async loginCustomer(credential) {
    try {
      const { email, password } = credential;

      const customer = await Customers.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });
      if (!customer) {
        throw new ErrorsApp(400, "email or password is invalid");
      }

      const isMatched = bcrypt.compareSync(password, customer.password);
      if (!isMatched) {
        throw new ErrorsApp(400, "email or password is invalid");
      }

      const token = jwt.sign(
        {
          id: customer.id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
        KEY_SERCRET,
        { expiresIn: "1d" }
      );
      delete customer.dataValues.password;
      return { customer, access_token: `Bearer ${token}` };
    } catch (error) {
      throw error;
    }
  }

  async loginEmployee(credential) {
    try {
      const { id, password } = credential;

      const employee = await Employees.findOne({
        where: { id },
        attributes: { include: ["password"] },
        include: [
          {
            model: Roles,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!employee) {
        throw new ErrorsApp(400, "id or password is invalid");
      }

      const isMatched = bcrypt.compareSync(password, employee.password);
      if (!isMatched) {
        throw new ErrorsApp(400, "id or password is invalid");
      }

      const token = jwt.sign(
        {
          id: employee.id,
          role: employee.role.name,
          firstName: employee.firstName,
          lastName: employee.lastName,
        },
        KEY_SERCRET,
        { expiresIn: "1d" }
      );

      delete employee.dataValues.password;

      let { role, ...newEmployee } = employee.dataValues;
      newEmployee = {
        ...newEmployee,
        role: employee.role.name,
      };
      return {
        employee: newEmployee,
        access_token: `Bearer ${token}`,
      };
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
module.exports = authService;
