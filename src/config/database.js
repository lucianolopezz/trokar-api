/**
 * Adicionar este arquivo na pasta src/config/
 */
const timezone = 'America/Campo_Grande'

require('moment').tz.setDefault(timezone);

module.exports = {
  dialect: 'mysql',
  host: 'db4free.net',
  port: '3306',
  username: 'lucianolopezz',
  password: '81488105',
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