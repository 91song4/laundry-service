'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.service_request.belongsTo(models.users_customer, { foreignKey: "customer_id" });
      models.service_request.hasMany(models.request_status, { foreignKey: "request_id" });
    }
  }
  service_request.init({
    request_id: {
      type: DataTypes.BIGINT,
      primaryKey:true,
    },
    customer_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.BLOB,
    request_details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'service_request',
  });
  return service_request;
};