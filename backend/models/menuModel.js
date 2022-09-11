const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const menu = db.define("menu", {
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    foodName: {
        type: DataTypes.STRING
    },
    foodType: {
        type: DataTypes.STRING
    }

})

module.exports = menu