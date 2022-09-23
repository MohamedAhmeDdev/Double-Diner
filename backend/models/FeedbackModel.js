const { DataTypes } = require("sequelize")
const db = require("../config/dbConfig.js")


const feedback = db.define('feedbacks', {
    feedback: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
})

module.exports = feedback
