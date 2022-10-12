const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const staff = db.define('staff', {
    idNo: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = staff
