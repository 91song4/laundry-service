'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_request extends Model {
    static associate(models) {
      models.service_request.belongsTo(models.user, { foreignKey: "user_id" });
      models.service_request.hasMany(models.request_status, { foreignKey: "request_id" });
    }
  }
  service_request.init({
    request_id: {
      type: DataTypes.BIGINT,
      primaryKey:true,
    },
    user_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.BLOB,
    request_details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'service_request',
    timestamps: false,
  });
  return service_request;
};