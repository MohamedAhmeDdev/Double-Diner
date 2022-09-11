const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const inventory = db.define('inventory', {
    item: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    }
})

module.exports = inventory
