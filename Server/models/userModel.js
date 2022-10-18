const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const useraccount = db.define("useraccounts", {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }, status: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }
})

module.exports = useraccount

