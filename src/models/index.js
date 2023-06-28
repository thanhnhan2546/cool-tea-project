const { Sequelize } = require("sequelize");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
} = require("../config/env");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.log("Can't connect: ", error);
  }
})();

const Products = require("./Product.model")(sequelize);
const Category = require("./categories.model")(sequelize);
const ProductPrices = require("./ProductPrices.model")(sequelize);
const Roles = require("./Roles.model")(sequelize);
const Employees = require("./Employees.model")(sequelize);
const Customers = require("./Customers.model")(sequelize);
const Orders = require("./Oders.model")(sequelize);
const OrderDetails = require("./OrderDetails.model")(sequelize);

Category.hasMany(Products, { as: "products", foreignKey: "idCategory" });

Products.hasMany(ProductPrices, { as: "prices", foreignKey: "idProduct" });
Roles.hasMany(Employees, { as: "employees", foreignKey: "idRole" });
Employees.belongsTo(Roles, { as: "role", foreignKey: "idRole" });
Employees.hasMany(Orders, { as: "orders", foreignKey: "idEmployee" });
Customers.hasMany(Orders, { as: "orders", foreignKey: "idCustomer" });
Orders.hasMany(OrderDetails, { as: "details", foreignKey: "idOrder" });
Products.hasMany(OrderDetails, { as: "orderDetails", foreignKey: "idProduct" });

module.exports = {
  Products,
  Category,
  ProductPrices,
  Roles,
  Employees,
  Customers,
  Orders,
  OrderDetails,
  sequelize,
};
