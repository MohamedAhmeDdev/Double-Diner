const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

//NEW sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
)

//connecting to database
try {
     dbConfig.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 

const db = {}
db.menus = require('./menuModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.reservations = require('./reservationModel.js')(sequelize, DataTypes)
db.inventory = require('./inventoryModel.js')(sequelize, DataTypes)
db.staffs = require('./StaffModel.js')(sequelize, DataTypes)


module.exports = db
