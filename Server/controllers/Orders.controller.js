const Order = require("../models/Orders.model");
const OrderDishes = require("../models/OrderDishes.model");

const createOrder = async (req, res) => {
  try {
    //get the user id from the token
    const user_id = req.user.id;

    const { dishes, delivery_address, delivery_phone } = req.body;

    if (!dishes || dishes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No dishes selected",
      });
    }

    if (dishes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No dishes selected",
      });
    }

    if (!delivery_address || !delivery_phone) {
      return res.status(400).json({
        success: false,
        message: "Delivery address and phone number are required",
      });
    }

    //calculate the total price of the order from the backend to avoid tampering
    const total_price = dishes.reduce((acc, dish) => {
      return acc + dish.quantity * dish.unit_price;
    }, 0);

    //create the order
    const order = await Order.create({
      user_id,
      order_status: "PENDING",
      order_date: new Date(),
      total_price,
      delivery_address,
      delivery_phone,
    });

    const order_id = order.order_id;

    //map the dishes to the order created
    const order_dishes = dishes.map((dish) => {
      return {
        order_id,
        dish_id: dish.dish_id,
        quantity: dish.quantity,
        unit_price: dish.unit_price,
      };
    });

    //insert the order dishes
    await OrderDishes.bulkCreate(order_dishes);

    res.status(201).json({
      success: true,
      order: {
        ...order.dataValues,
        dishes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllOrdersForUser = async (req, res) => {
  try {
    //get the user id from the token
    const user_id = req.user.id;

    //get all the orders for the user
    const orders = await Order.findAll({ where: { user_id } });

    //populate the dishes in the order
    const ordersWithDishes = await Promise.all(
      orders.map(async (order) => {
        const order_id = order.order_id;
        const dishes = await OrderDishes.findAll({ where: { order_id } });
        return {
          ...order.dataValues,
          dishes,
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithDishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//get the order for the user by id
const getOrderForUserById = async (req, res) => {
  //get the order id from the url params
  const { id } = req.params;
  try {
    //get the user id from the token
    const user_id = req.user.id;

    //get the order for the user
    const order = await Order.findOne({ where: { id, user_id } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      //populate the dishes in the order
      const order_id = order.order_id;
      const dishes = await OrderDishes.findAll({ where: { order_id } });

      const orderWithDishes = {
        ...order.dataValues,
        dishes,
      };

      return res.status(200).json({
        success: true,
        order: orderWithDishes,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//update the order for the user by id - only the order status can be updated by the user (when they cancel the order )

const updateOrderForUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user.id;
    const order = await Order.findOne({ where: { id: id, user_id: user_id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      const { order_status } = req.body;
      await Order.update({ order_status }, { where: { id, user_id } });

      const updatedOrder = await Order.findOne({
        where: { id, user_id },
      });

      //populate the dishes in the order
      const order_id = updatedOrder.order_id;

      const dishes = await OrderDishes.findAll({ where: { order_id } });

      const updatedOrderWithDishes = {
        ...updatedOrder.dataValues,
        dishes,
      };

      return res.status(200).json({
        success: true,
        order: updatedOrderWithDishes,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteOrderForUserById = async (req, res) => {
  //get the order id from the url params
  const { id } = req.params;
  try {
    //get the user id from the token
    const user_id = req.user.id;

    //get the order for the user
    const order = await Order.findOne({ where: { id, user_id } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      await Order.destroy({
        where: { id: id, user_id: user_id },
      });

      //cascade delete the order dishes
      await OrderDishes.destroy({
        where: { order_id: id },
      });

      return res.status(200).json({
        success: true,
        orderId: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/** ADMIN TODO - introduce limits, for pagination having a lot of data on transtfer slows performance */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    //populate the dishes in the order
    const ordersWithDishes = await Promise.all(
      orders.map(async (order) => {
        const order_id = order.order_id;
        const dishes = await OrderDishes.findAll({ where: { order_id } });
        return {
          ...order.dataValues,
          dishes,
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithDishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      //populate the dishes in the order
      const order_id = order.order_id;
      const dishes = await OrderDishes.findAll({ where: { order_id } });

      const orderWithDishes = {
        ...order.dataValues,
        dishes,
      };

      return res.status(200).json({
        success: true,
        order: orderWithDishes,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      const { dishes, order_status, order_date } = req.body;
      await Order.update({ dishes, order_status }, { where: { id } });

      const updatedOrder = await Order.findOne({
        where: { id },
      });

      //populate the dishes in the order
      const order_id = updatedOrder.order_id;

      const _dishes = await OrderDishes.findAll({ where: { order_id } });

      const updatedOrderWithDishes = {
        ...updatedOrder.dataValues,
        dishes: _dishes,
      };

      return res.status(200).json({
        success: true,
        order: updatedOrderWithDishes,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      await Order.destroy({
        where: { id },
      });

      //cascade delete the order dishes
      await OrderDishes.destroy({
        where: { order_id: id },
      });

      return res.status(200).json({
        success: true,
        orderId: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
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
