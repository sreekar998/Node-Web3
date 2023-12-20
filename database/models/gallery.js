'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A gallery belongs to a user (Many-to-One)
      Gallery.belongsTo(models.User, { foreignKey: 'userId' });
    
      // A gallery can contain multiple NFTs (One-to-Many)
      Gallery.hasMany(models.galleryNfts, { foreignKey: 'galleryId' });
    
      // A gallery can be liked by multiple users (Many-to-Many)
      Gallery.belongsToMany(models.User, {
        through: 'GalleryLikes',
        foreignKey: 'galleryId',
      });
    
      // A gallery can receive multiple comments (One-to-Many)
      Gallery.hasMany(models.GalleryComments, { foreignKey: 'galleryId' });
    
      // ... other associations
    }
    
  }
  Gallery.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Add this line to specify 'id' as the primary key
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    coverPhoto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};