const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

/**
 * This is the model for the order_dishes table, it has a foreign key to the orders table and a foreign key to the dishes table
 * It is a junction table that will store the dishes that are ordered in a specific order
 */

const OrderDishes = db.define(
  "order_dishes",
  {
    order_dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
    },
    dish_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unit_price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    initialAutoIncrement: 100,
  }
);

db.sync()
  .then(() => {
    console.log("OrderDishes table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced OrderDishes table", error);
  });

module.exports = OrderDishes;
