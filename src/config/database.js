/**
 * Adicionar este arquivo na pasta src/config/
 */
const timezone = 'America/Campo_Grande'

require('moment').tz.setDefault(timezone);

module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '',
  database: 'trokar',
  operatorAliases: false,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
  },
  timezone: timezone //for writing to database
}