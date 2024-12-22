"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryService.belongsTo(models.Service, {
        foreignKey: { name: "serviceId", allowNull: false },
        as: "service",
        targetKey: "id",
        through: { CategoryService },
      });
      CategoryService.belongsTo(models.Category, {
        foreignKey: { name: "categoryId", allowNull: false },
        as: "category",
        targetKey: "id",
        through: { CategoryService },
      });
    }
  }
  CategoryService.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      serviceId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "CategoryService",
    }
  );
  return CategoryService;
};
