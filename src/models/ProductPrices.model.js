const { DataTypes, Sequelize } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "ProductPrices",
    {
      idProduct: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      size: {
        type: DataTypes.ENUM("M", "L", "no size"),
        defaultValue: "no size",
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createAt: {
        type: "TIMESTAMP",
        defaultValue: currentTime,
        field: "created_at",
      },
      updateAt: {
        type: "TIMESTAMP",
        defaultValue: currentTime,
        field: "updated_at",
      },
    },
    {
      tableName: "product_prices",
      timestamps: false,
    }
  );
};
