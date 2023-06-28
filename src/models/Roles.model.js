const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Roles",
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
      tableName: "roles",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["deleted"],
        },
      },
    }
  );
};
