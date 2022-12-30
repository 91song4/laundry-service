'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users_customer.hasMany(models.service_request, { foreignKey: "customer_id" });
      models.users_customer.hasMany(models.review, { foreignKey: "customer_id" });
    }
  }
  users_customer.init({
    customer_id: {
      type: DataTypes.BIGINT,
      primaryKey:true,
    },
    email: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    point: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'users_customer',
  });
  return users_customer;
};