const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.RDS_HOSTNAME,
  user: process.env.DB_USER || process.env.RDS_USERNAME,
  password: process.env.DB_PASSWORD || process.env.RDS_PASSWORD,
  database: process.env.DB_NAME || process.env.RDS_DB_NAME,
  port: process.env.DB_PORT || process.env.RDS_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
