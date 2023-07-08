const { currentTime } = require("../config/config");
const { ErrorsApp } = require("../helpers/error");
const { Customers } = require("../models");

class CustomerService {
  async getAllCustomer() {
    try {
      const customers = await Customers.findAll({
        where: {
          deleted: false,
        },
      });
      return customers;
    } catch (error) {
      throw error;
    }
  }
  async getOneCustomer(id) {
    try {
      const customer = await Customers.findByPk(id);
      if (!customer) {
        throw new ErrorsApp(400, "Customer is not existed");
      }
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(customer) {
    try {
      const { email } = customer;
      const selectCus = await Customers.findOne({
        where: { email },
      });
      if (selectCus) {
        throw new ErrorsApp(400, "Email is existed");
      }
      const createCate = await Customers.create(customer);
      return createCate;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(customer, id) {
    try {
      await this.getOneCustomer(id);
      customer = {
        ...customer,
        updatedAt: currentTime,
      };
      await Customers.update(customer, {
        where: { id },
      });
      return await this.getOneCustomer(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrRestoreCus(id, hasDel) {
    try {
      const selectCus = await this.getOneCustomer(id);
      if (hasDel == selectCus.deleted) {
        throw new ErrorsApp(400, "Request is invalid");
      }
      let deleted = {
        deleted: hasDel,
      };
      if (hasDel) {
        deleted = {
          ...deleted,
          deletedAt: currentTime,
        };
      }
      await Customers.update(deleted, { where: { id } });
      return hasDel ? "Delete Success" : "Restore Success";
    } catch (error) {
      throw error;
    }
  }

  async deletePernamently(id) {
    try {
      await this.getOneCustomer(id);
      await Customers.destroy({
        where: { id },
      });
      return "Delete Pernamently Success";
    } catch (error) {
      throw error;
    }
  }
}

const customerService = new CustomerService();
module.exports = customerService;
