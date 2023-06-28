const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Employees",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        field: "date_of_birth",
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idRole: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "id_role",
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
      tableName: "employees",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["password", "deleted", "idRole"],
        },
      },
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.createdAt;
          delete record.dataValues.updatedAt;
          delete record.dataValues.deletedAt;
          delete record.dataValues.deleted;
        },
      },
    }
  );
};
