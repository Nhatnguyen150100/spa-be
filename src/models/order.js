"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Service, {
        foreignKey: { name: "userId", allowNull: false },
        as: "user",
        targetKey: "id",
        through: { Order },
      });
      Order.belongsTo(models.Service, {
        foreignKey: { name: "serviceId", allowNull: false },
        as: "service",
        targetKey: "id",
        through: { Order },
      });
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: DataTypes.UUID,
      serviceId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
