const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING, 
    phone: DataTypes.STRING,
    cep: DataTypes.STRING,
    city: DataTypes.STRING,
    uf: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    place: DataTypes.STRING,
    complement: DataTypes.STRING,
    type_vehicle: DataTypes.STRING,
    brand: DataTypes.STRING,
    year: DataTypes.INTEGER,
    model: DataTypes.STRING,
    km: DataTypes.DECIMAL,
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
    token: {
      type: DataTypes.VIRTUAL(),
      get: function() {
        const id = this.get('id');
        return jwt.sign({ id }, authConfig.secret, {
          expiresIn: '365d'
        });
      }
    }
  });

  user.associate = (models) => {
    user.belongsTo(models.Photos, {      
      foreignKey: 'user_id',
    });
  };

  return user;
}