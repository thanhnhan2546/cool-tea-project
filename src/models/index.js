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

module.exports = {
  Products,
  sequelize,
};
