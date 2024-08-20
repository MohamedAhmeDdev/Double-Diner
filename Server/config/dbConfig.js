const sequelize = require('sequelize');
const db = new sequelize('bmq2lb1fv6dngsa8r4af', 'uhgbpbomzhzi1s1g', 'JmOL1UIirVeaLmNTOIYF', {
    host: 'bmq2lb1fv6dngsa8r4af-mysql.services.clever-cloud.com',
    port: 3306,
    dialect: 'mysql',
  });
    
module.exports = db