module.exports = (sequelize, DataTypes) => {
const inventory = sequelize.define('inventory',{
    item:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    quantity:{
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.DATE
    }
})

 return inventory
}