"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userUuid" });
    }
  }

  UserStatus.init(
    {
      userStatus: {
        type: DataTypes.ENUM("Arrived", "Left"),
        defaultValue: "Left",
      },
      arrivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "userStatus",
      modelName: "UserStatus",
    }
  );
  return UserStatus;
};
