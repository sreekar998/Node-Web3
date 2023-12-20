'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nfts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A single NFT can belong to multiple galleries (Many-to-One)
      Nfts.belongsTo(models.galleryNfts, { foreignKey: 'nftId' });
    
      // ... other associations
    }
    
  }
  Nfts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Add this line to specify 'id' as the primary key
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    tokenAddress: DataTypes.STRING,
    tokenId: DataTypes.INTEGER,
    chainId: DataTypes.INTEGER,
    metaDataImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nfts',
  });
  return Nfts;
};