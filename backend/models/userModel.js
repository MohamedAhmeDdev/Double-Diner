module.exports = (sequelize, DataTypes) => {

    const useraccount = sequelize.define("useraccounts", {
        name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password:{
            type:DataTypes.INTEGER
        }
    })

    return useraccount

}