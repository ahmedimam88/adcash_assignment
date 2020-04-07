const dbConfig = require("../config/db.config.js");

const Pool = require('pg').Pool

const client = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
})

module.exports = client;
