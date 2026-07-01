const Category = require("../../models/Category.model");
const Dish = require("../../models/Dishes.Model");
const OrderDishes = require("../../models/OrderDishes.model");
const sequelize = require('sequelize');

const getDishForReport = async (req, res) => {
  try {
    const dishReport = await OrderDishes.findAll({
      group: ['order_dishes.dish_id', 'dish.dish_id'], 
      attributes: [
        'dish_id',
        [sequelize.fn('SUM', sequelize.col('order_dishes.quantity')), 'total_units_sold'],
        [sequelize.fn('COUNT', sequelize.col('order_dishes.dish_id')), 'total_orders_count']
      ],
      include: [{
        model: Dish,
        attributes: ['name','price', 'quantity'], 
        include: [{ model: Category}]
      }]
    });

    return res.status(200).json({
      success: true,
      dishReport,
    });

  } catch (error) {
    console.error("Report generation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDishForReport
};