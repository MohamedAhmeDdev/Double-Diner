const Order = require("../models/Orders.model");
const OrderDishes = require("../models/OrderDishes.model");
const User = require("../models/User.model");
const Dish = require("../models/Dishes.model");
const axios = require('axios')




const createToken = async (req, res, next) => {
  const secret = "Wjgif1owqPvnE8ZJ";
  const consumer = "gA93UMRglA19Ism2qEIGhBMdSHRAzZNz";
  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

  await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
      headers: {
        authorization: `Basic ${auth}`,
      },
    }
  )
  .then((data) => {
    req.token = data.data.access_token; // Save token in req object
    console.log(data.data);
    next();
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err.message);
  });
};

const createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { dishes, delivery_address, delivery_phone } = req.body;

    if (!dishes || dishes.length === 0) {
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

    const total_price = dishes.reduce((acc, dish) => {
      return acc + dish.quantity * dish.unit_price;
    }, 0);

    const shortCode = 174379;
    const phone = req.body.delivery_phone.substring(1);
    const amount = total_price;
    const passkey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = new Buffer.from(shortCode + passkey + timestamp).toString( "base64");
  
    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: `254${phone}`,
      PartyB: 174379,
      PhoneNumber: `254${phone}`,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "Double Diner",
      TransactionDesc: "Testing stk push",
    };

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
  
      //insert the order dishes ,bulkCreate() method allows you to insert multiple records to your database table with a single function call.
      await OrderDishes.bulkCreate(order_dishes);
  
      // deduct the quantity of the dishes from the inventory
      const dishPromises = dishes.map(async (dish) => {
        const dish_id = dish.dish_id;
        const quantity = dish.quantity;
  
        const dishInDb = await Dish.findOne({ where: { id: dish_id } });
  
        const newQuantity = dishInDb.quantity - quantity;
  
        await Dish.update({ quantity: newQuantity }, { where: { id: dish_id } });
  
        return dishInDb;
      });
  
      await Promise.all(dishPromises);
  
    await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${req.token}`,
      },
    })
    res.status(201).json({
      success: true,
      order: {...order.dataValues,  dishes,},
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
      orders.map(async (order) => {const order_id = order.order_id;
        const dishes = await OrderDishes.findAll({ where: { order_id } });

        // populate the dish details in the order
        const dishDetails = await Promise.all(
          dishes.map(async (dish) => { const _dish = await Dish.findOne({ where: { id: dish.dish_id }, });
            return { ...dish.dataValues,  metadata: _dish,};
          })
        );

        return {...order.dataValues,dishes: dishDetails,};
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
    const order = await Order.findOne({ where: { order_id: id, user_id } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      //populate the dishes in the order
      const order_id = order.order_id;
      const dishes = await OrderDishes.findAll({ where: { order_id } });

      // populate the dish details in the order
      const dishDetails = await Promise.all(
        dishes.map(async (dish) => { const _dish = await Dish.findOne({where: { id: dish.dish_id },});

          return {  ...dish.dataValues, metadata: _dish,
          };
        })
      );

      const orderWithDishes = {...order.dataValues,dishes: dishDetails, };

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
    const order = await Order.findOne({ where: { order_id: id, user_id: user_id },
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      const { order_status } = req.body;
      await Order.update({ order_status },{ where: { order_id: id, user_id } }
      );

      const updatedOrder = await Order.findOne({ where: { order_id: id, user_id },
      });

      //populate the dishes in the order
      const order_id = updatedOrder.order_id;

      const dishes = await OrderDishes.findAll({ where: { order_id } });

      const dishesWithDetails = await Promise.all(
        dishes.map(async (dish) => {
          const _dish = await Dish.findOne({ where: { id: dish.dish_id } });

          return {  ...dish.dataValues, metadata: _dish,};
        })
      );

      const updatedOrderWithDishes = { ...updatedOrder.dataValues, dishes: dishesWithDetails,};

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
      await Order.destroy({ where: { id: id, user_id: user_id },});

      //cascade delete the order dishes
      await OrderDishes.destroy({ where: { order_id: id },});

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

    //populate the users  - this is not efficient, but it works for now
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => { const user = await User.findOne({ where: { id: order.user_id } });

        return { ...order.dataValues,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithUser,
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
    const order = await Order.findOne({ where: { order_id: id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      //populate the dishes in the order
      const order_id = order.order_id;
      const orderedDishes = await OrderDishes.findAll({ where: { order_id } });
      const user = await User.findOne({ where: { id: order.user_id } });

      const orderWithDishDetails = await Promise.all(
        orderedDishes.map(async (dish) => { const dishDetails = await Dish.findOne({ where: { id: dish.dish_id }, });

          return { ...dish.dataValues, metadata: dishDetails,};
        })
      );

      const orderWithDishes = {...order.dataValues, dishes: orderWithDishDetails,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
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
    const order = await Order.findOne({ where: { order_id: id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      const { order_status } = req.body;
      await Order.update({ order_status }, { where: { order_id: id } });

      const updatedOrder = await Order.findOne({where: { order_id: id },});

      //populate the dishes in the order
      const order_id = updatedOrder.order_id;

      const orderedDishes = await OrderDishes.findAll({ where: { order_id } });
      const user = await User.findOne({ where: { id: updatedOrder.user_id } });

      const orderWithDishDetails = await Promise.all(
        orderedDishes.map(async (dish) => {
          const dishDetails = await Dish.findOne({ where: { id: dish.dish_id },});

          return {...dish.dataValues,metadata: dishDetails,};
        })
      );

      const updatedOrderWithDishes = {...updatedOrder.dataValues, dishes: orderWithDishDetails,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      return res.status(200).json({
        success: true,
        order: updatedOrderWithDishes,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: {	order_id: id } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      await Order.destroy({ where: {	order_id: id }, });

      //cascade delete the order dishes
      await OrderDishes.destroy({ where: { order_id: id },});

      return res.status(200).json({
        success: true,
        orderId: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
       message: error.message,
    });
  }
};

module.exports = {
  createToken,
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
