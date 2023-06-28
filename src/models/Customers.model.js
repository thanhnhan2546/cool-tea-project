const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Customers",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "customers",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["deleted", "password"],
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
