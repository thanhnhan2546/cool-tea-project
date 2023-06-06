const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "product_name",
      },
      idCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "id_category",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "1",
      },
    },
    {
      tableName: "products",
    }
  );
};
