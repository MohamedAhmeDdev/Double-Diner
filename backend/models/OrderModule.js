const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const order = db.define('customerorders', {
    fullName: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    },
    address: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
     } 
});

module.exports = order
