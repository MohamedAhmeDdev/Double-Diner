const Dish = require("../../models/Dishes.Model");
const OrderDishes = require("../../models/OrderDishes.model");
const sequelize = require('sequelize');


const getDishForReport = async (req, res) => {

 try {
  //we want to check if the dish_id is repetend more than once if so then calculate how many time the data we store it in (dish_id_quantity)
   const dishes = await OrderDishes.findAll({
    group: ['dish_id'],
  attributes: ['dish_id', [sequelize.fn('sum', sequelize.col('quantity')), 'dish_id_quantity'], 'unit_price']
  });

   
 //we are mapping the dishes to get the dish name
   const dishDetails = await Promise.all(
    dishes.map(async (dish) => { const _dish = await Dish.findOne({ where: { id: dish.dish_id }, });
      return { ...dish.dataValues,  metadata: _dish,};
      
    })
   );

   //dish_id_quantity = it stores the number of time the dish_id have been ordered
   //quantity = this has the sum of all the quantity that the dish_id has 

   dishDetails.map(dish => {
    dish.quantity = dish.quantity ? dish.quantity : 0;
    dish.quantity += dish.dish_id_quantity;
    return dish;
 });
  
  res.status(200).json({
    success: true,
    dishReport: dishDetails,
    
  });
 
 } catch (error) {
   res.status(500).json({
     success: false,
     message: error.message,
   });
 }
};

       
   

  module.exports = {
    getDishForReport
  };





