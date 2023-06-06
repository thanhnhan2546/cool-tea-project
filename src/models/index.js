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
const Product_prices = require("./Product_prices.model")(sequelize);

Category.hasMany(Products, { as: "products", foreignKey: "idCategory" });

Product_prices.belongsTo(Products, { as: "product", foreignKey: "idProduct" });

module.exports = {
  Products,
  Category,
  Product_prices,
  sequelize,
};
