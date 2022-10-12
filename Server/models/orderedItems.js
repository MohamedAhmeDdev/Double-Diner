const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js");


const orderItems = db.define('orderedItems', {
    image: {
        type: DataTypes.STRING
    },
    foodName: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER
    },

    order_id: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true
});



module.exports = orderItems

