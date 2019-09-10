const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('Likes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_source: DataTypes.INTEGER,
    user_target: DataTypes.INTEGER,
    like: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }, 
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

  /*user.associate = (models) => {
    user.belongsTo(models.Photos, {      
      foreignKey: 'user_id',
    });
  };*/

  return like;
}