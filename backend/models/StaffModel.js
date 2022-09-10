module.exports = (sequelize, DataTypes) => {
const staff = sequelize.define('staff',{
    idNo:{
        type:DataTypes.STRING
    },
    fullName:{
        type:DataTypes.STRING
    },
    department:{
        type:DataTypes.STRING
    },
    picture:{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true
});

return staff
}