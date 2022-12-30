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
      models.review.belongsTo(models.users_customer, { foreignKey: "customer_id" });
      models.review.belongsTo(models.users_provider, { foreignKey: "provider_id" });
    }
  }
  review.init({
    review_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    customer_id: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    star: DataTypes.BIGINT,
    review: DataTypes.TEXT,
    photo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};