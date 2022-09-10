module.exports = (sequelize, DataTypes) => {

    const menu = sequelize.define("menu", {
        image: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        foodName: {
            type: DataTypes.STRING
        },
        foodType: {
            type: DataTypes.STRING
        }
    
    })

    return menu
}