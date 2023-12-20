'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFollowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userFollowers.init({
    FollowerId: DataTypes.INTEGER,
    FolloweeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFollowers',
  });
  return userFollowers;
};