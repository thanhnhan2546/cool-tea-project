const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
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
      tableName: "users",
      timestamps: false,
    }
  );
};
