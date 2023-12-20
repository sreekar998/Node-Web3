'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NftOwners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NftOwners.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Add this line to specify 'id' as the primary key
      autoIncrement: true,
    },
    nftId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NftOwners',
  });
  return NftOwners;
};