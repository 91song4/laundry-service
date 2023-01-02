'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.service_request, { foreignKey: "user_id" });
      models.user.hasMany(models.review, { foreignKey: "user_id" });
    }
  }
  user.init({
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    point: DataTypes.BIGINT,
    user_type: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false ,
  });
  return user;
};