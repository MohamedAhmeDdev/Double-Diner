const Order = require("../models/Orders.model");
const OrderDishes = require("../models/OrderDishes.model");
const User = require("../models/User.model");
const Dish = require("../models/Dishes.Model");
const Category = require("../models/Category.model.js"); 

// CREATE NEW ORDER (Pure Database Flow)
const createOrder = async (req, res) => {
  try {
    const user_id = req.user.user_id || req.user.id;
    const { dishes } = req.body;

    if (!dishes || dishes.length === 0) {
      return res.status(400).json({ success: false, message: "No dishes selected" });
    }

    // Fetch user profile data to check delivery requirements
    const userProfile = await User.findOne({ where: { user_id } });
    if (!userProfile) {
      return res.status(404).json({ success: false, message: "User profile context not found" });
    }

    // Direct profile checking safeguards
    if (!userProfile.address || !userProfile.phone) {
      return res.status(400).json({ 
        success: false, 
        message: "Please complete your delivery address and phone profile details before checking out." 
      });
    }

    const total_price = dishes.reduce((acc, dish) => acc + (dish.quantity * dish.unit_price), 0);

    // Create the core system order record
    const order = await Order.create({
      user_id,
      order_number: "DD-" + Math.floor(100000 + Math.random() * 900000),
      order_status: "PENDING",
      payment_status: "paid",
      payment_method: "cash",
      subtotal: total_price,
      total_price,
    });

    const order_id = order.order_id;

    // Map ordered elements array data to the model junction attributes schema
    const order_dishes = dishes.map((dish) => ({
      order_id,
      dish_id: dish.dish_id,
      quantity: dish.quantity,
      total_price: (dish.quantity * dish.unit_price)
    }));

    await OrderDishes.bulkCreate(order_dishes);

    // Synchronize current stock listings down cleanly
    const dishPromises = dishes.map(async (dish) => {
      const dishInDb = await Dish.findOne({ where: { dish_id: dish.dish_id } });
      if (dishInDb) {
        const newQuantity = Math.max(0, dishInDb.quantity - dish.quantity);
        await Dish.update({ quantity: newQuantity }, { where: { dish_id: dish.dish_id } });
      }
    });

    await Promise.all(dishPromises);

    return res.status(201).json({
      success: true,
      order: { 
        ...order.dataValues, 
        dishes,
        delivery_address: userProfile.address, 
        delivery_phone: userProfile.phone 
      },
    });

  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL ORDERS FOR LOGGED IN USER
const getAllOrdersForUser = async (req, res) => {
  try {
    const user_id = req.user.user_id || req.user.id;

    const orders = await Order.findAll({
      where: { user_id },
      include: [{
        model: Dish,
        through: { attributes: ['quantity', 'total_price'] },
        include: [{ model: Category }]
      }]
    });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET USER ORDER BY ID
const getOrderForUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user.user_id || req.user.id;

    const order = await Order.findOne({
      where: { order_id: id, user_id },
      include: [
        { model: User, attributes: ['user_id', 'name', 'email', 'phone', 'address', 'city'] }, 
        { 
          model: Dish, 
          through: { attributes: ['quantity', 'total_price'] },
          include: [{ model: Category }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE USER ORDER
const updateOrderForUserById = async (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;
  try {
    const user_id = req.user.user_id || req.user.id;

    const order = await Order.findOne({ where: { order_id: id, user_id } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await Order.update({ order_status }, { where: { order_id: id, user_id } });

    const updatedOrder = await Order.findOne({
      where: { order_id: id, user_id },
      include: [{ 
        model: Dish,
        include: [{ model: Category }]
      }]
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE USER ORDER RECORD
const deleteOrderForUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user.user_id || req.user.id;

    const order = await Order.findOne({ where: { order_id: id, user_id } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await OrderDishes.destroy({ where: { order_id: id } });
    await Order.destroy({ where: { order_id: id, user_id } });

    return res.status(200).json({ success: true, orderId: id });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADMIN: GET ALL SYSTEM ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['user_id', 'name', 'email', 'phone', 'address', 'city'] }, 
        { 
          model: Dish, 
          through: { attributes: ['quantity', 'total_price'] },
          include: [{ model: Category }]
        }
      ]
    });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADMIN: GET SINGLE ORDER BY SYSTEM ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { order_id: id },
      include: [
        { model: User, attributes: ['user_id', 'name', 'email', 'phone', 'address', 'city'] },
        { 
          model: Dish, 
          through: { attributes: ['quantity', 'total_price'] },
          include: [{ model: Category }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADMIN: UPDATE ORDER STATUS 
const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;
  try {
    const order = await Order.findOne({ where: { order_id: id } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await Order.update({ order_status }, { where: { order_id: id } });

    const updatedOrder = await Order.findOne({
      where: { order_id: id },
      include: [
        { model: User, attributes: ['user_id', 'name', 'email', 'phone', 'address', 'city'] },
        { 
          model: Dish, 
          through: { attributes: ['quantity', 'total_price'] },
          include: [{ model: Category }]
        }
      ]
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADMIN: ERASE SYSTEM ORDER PERMANENTLY
const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { order_id: id } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await OrderDishes.destroy({ where: { order_id: id } });
    await Order.destroy({ where: { order_id: id } });

    return res.status(200).json({ success: true, orderId: id });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrdersForUser,
  getOrderForUserById,
  updateOrderForUserById,
  deleteOrderForUserById,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};