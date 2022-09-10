module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("menu", {
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

    return Product

}