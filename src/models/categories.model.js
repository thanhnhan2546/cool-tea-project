const { DataTypes } = require("sequelize");
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
          const hasSize = this.getDataValue("has_size");
          return hasSize ? true : false;
        },
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
        field: "deleted_at",
      },
    },

    {
      tableName: "categories",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["deleted"],
        },
      },
      hooks: {
        afterCreate: (record) => {
          console.log(record.dataValues.createdAt);
        },
        afterFind: (record) => {
          if (record) {
            record.dataValues.hasSize = 0 ? false : true;
          }
        },
      },
    }
  );
};
