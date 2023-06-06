require("dotenv").config();
const {
  KEY_SERCRET,
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
} = process.env;

module.exports = {
  KEY_SERCRET,
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
};
