'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A file belongs to a user (Many-to-One)
      Files.belongsTo(models.User, { foreignKey: 'user_id' });
    
      // ... other associations
    }
    
  }
  Files.init({
    file_name: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_path: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Files',
  });
  return Files;
};