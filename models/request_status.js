'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.request_status.belongsTo(models.service_request, { foreignKey: "request_id" });
      models.request_status.belongsTo(models.user, { foreignKey: "provider_id" });
    }
  }
  request_status.init({
    request_id: {
      type: DataTypes.BIGINT,
      primaryKey:true
    },
    provider_id: DataTypes.BIGINT,
    current_status: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'request_status',
    timestamps: false,
  });
  return request_status;
};