'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GalleryComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A comment belongs to a user (Many-to-One)
      GalleryComments.belongsTo(models.User, { foreignKey: 'userId' });

    }
    
  }
  GalleryComments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Add this line to specify 'id' as the primary key
      autoIncrement: true,
    },
    galleryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentText: DataTypes.STRING,
    timestamp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GalleryComments',
  });
  return GalleryComments;
};