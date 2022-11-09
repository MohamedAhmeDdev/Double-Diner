const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const orderInfo = db.define('customerorders', {
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
    },
    priceTotal: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING"
    }
}, {
    timestamps: true
});



module.exports = orderInfo
