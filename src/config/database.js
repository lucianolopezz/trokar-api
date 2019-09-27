const timezone = 'America/Campo_Grande'

require('moment').tz.setDefault(timezone);

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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