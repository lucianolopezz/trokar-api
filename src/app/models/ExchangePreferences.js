module.exports = (sequelize, DataTypes) => {
  const exchangePreference = sequelize.define('ExchangePreferences', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  });

  return exchangePreference;
}