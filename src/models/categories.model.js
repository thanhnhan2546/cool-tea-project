const { DataTypes, Sequelize } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hasSize: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        field: "has_size",
        get() {
          const hasSize = this.getDataValue("hasSize");
          return hasSize ? true : false;
        },
      },
      deleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
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
        field: "deleted_at",
      },
    },

    {
      tableName: "categories",
      timestamps: false,
    }
  );
};
