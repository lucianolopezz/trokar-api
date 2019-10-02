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
    liked: {
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

  like.associate = (models) => {
    like.belongsTo(models.Users, {
      foreignKey: 'user_source',
    });
  };

  return like;
}