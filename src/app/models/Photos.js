const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('Photos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    key: DataTypes.STRING,
    url: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },    
    created: {
      type: DataTypes.DATE,
      defaultValue: moment().format()
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: moment().format()
    },
  });

  photo.associate = (models) => {
    photo.belongsTo(models.Users, {      
      foreignKey: 'user_id',
    });
  };

  return photo;
}