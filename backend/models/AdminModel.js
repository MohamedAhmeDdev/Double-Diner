const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const admin = db.define("admin", {
    userName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

module.exports = admin

