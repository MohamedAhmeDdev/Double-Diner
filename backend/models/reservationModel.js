module.exports = (sequelize, DataTypes) => {
const reservation = sequelize.define('reservation',{
    fullName:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.INTEGER
    },
    tableFor:{
        type:DataTypes.INTEGER
    },
    time:{
        type:DataTypes.TIME
    },
    dateReserve:{
        type:DataTypes.DATE
    }
});

return reservation
}