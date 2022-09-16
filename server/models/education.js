'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user',
      });
    }
  }
  Education.init(
    {
      universityName: DataTypes.STRING,
      educationDegree: DataTypes.STRING,
      fieldOfStudy: DataTypes.STRING,
      starDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      description: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Education',
    }
  );
  return Education;
};
