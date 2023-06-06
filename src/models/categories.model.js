const { DataTypes, Sequelize } = require("sequelize");

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
      tableName: "categories",
      timestamps: false,
    }
  );
};
