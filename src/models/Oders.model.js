const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idCustomer: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "id_customer",
      },
      idEmployee: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "id_employee",
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
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
      tableName: "orders",
      timestamps: false,
    }
  );
};
