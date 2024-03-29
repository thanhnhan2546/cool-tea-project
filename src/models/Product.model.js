const { DataTypes } = require("sequelize");
const { currentTime } = require("../config/config");

module.exports = (sequelize) => {
  return sequelize.define(
    "Products",
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
      idCategory: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "id_category",
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
      tableName: "products",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["deleted"],
        },
      },
      hooks: {
        afterCreate: (record) => {
          console.log("record: ", record.dataValues.createdAt);
          delete record.dataValues.deletedAt;
        },
        afterFind: async (instance) => {
          if (instance) {
            // Thực hiện các tác vụ tùy chỉnh với instance sau khi tìm thấy
            console.log("Hook afterFind executed");
            console.log(instance);
          }
        },
      },
    }
  );
};
