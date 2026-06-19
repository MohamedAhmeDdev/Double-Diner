// Load the environment variables
const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  }
);

module.exports = db;