const sequelize = require('sequelize');

const db = new sequelize('double_diner', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db