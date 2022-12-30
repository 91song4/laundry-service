'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users_provider.hasMany(models.request_status, { foreignKey: "provider_id" });
      models.users_provider.hasMany(models.review, { foreignKey: "provider_id" });
    }
  }
  users_provider.init({
    provider_id: {
      type: DataTypes.BIGINT,
      primaryKey:true,
    },
    email: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    point: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'users_provider',
  });
  return users_provider;
};