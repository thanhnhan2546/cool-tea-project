const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "OderDetails",
    {
      idOrder: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "id_order",
      },
      idProduct: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "id_product",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_price",
      },
      deleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        get() {
          const deleted = this.getDataValue("deleted");
          return deleted ? true : false;
        },
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: currentTime,
        field: "created_at",
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: currentTime,
        field: "updated_at",
      },
      deletedAt: {
        type: "TIMESTAMP",
        defaultValue: currentTime,
        field: "delete_at",
      },
    },
    {
      tableName: "order_details",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["deleted"],
        },
      },
    }
  );
};
