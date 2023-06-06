const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Product_prices",
    {
      idProduct: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      size: {
        type: DataTypes.ENUM("M", "L"),
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "create_at",
      },
      updateAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "update_at",
      },
    },
    {
      tableName: "product_prices",
      timestamps: false,
    }
  );
};
