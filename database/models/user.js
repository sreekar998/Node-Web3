'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A user can have multiple galleries
      User.hasMany(models.Gallery, { foreignKey: 'userId' });

      // A user can follow other users (Many-to-Many relationship)
      User.belongsToMany(models.User, {
        as: 'followers', // Alias for the followers
        through: 'UserFollowers', // The intermediate table
        foreignKey: 'followeeId', // Foreign key in the intermediate table
      });

      // A user can be followed by other users (Many-to-Many relationship)
      User.belongsToMany(models.User, {
        as: 'following', // Alias for the users being followed
        through: 'UserFollowers', // The intermediate table
        foreignKey: 'followerId', // Foreign key in the intermediate table
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      walletAddress: DataTypes.STRING,
      nonce: DataTypes.INTEGER,
      password: DataTypes.STRING,
      avatarPhoto: DataTypes.STRING,
      coverPhoto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
