'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.review.belongsTo(models.user, { foreignKey: "customer_id", as: 'customer' });
      models.review.belongsTo(models.user, { foreignKey: "provider_id", as: 'provider' });
      models.review.hasMany(models.service_request, { foreignKey: 'request_id' });
    }
  }
  review.init({
    review_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    customer_id: DataTypes.STRING,
    request_id: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    star: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
    timestamps: false,
  });
  return review;
};