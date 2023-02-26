"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  Logs.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      logMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "logs",
      modelName: "Logs",
    }
  );
  return Logs;
};
