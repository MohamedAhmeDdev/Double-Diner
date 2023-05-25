const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

/**
 * Here we just define the orders model, the ordered dishes will be stored in a table called order_dishes which will have a foreign key to the orders table
 */

const Orders = db.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    order_status: {
      type: DataTypes.STRING,
    },
    order_date: {
      type: DataTypes.DATE,
    },
    total_price: {
      type: DataTypes.FLOAT,
    },
    delivery_address: {
      type: DataTypes.STRING,
    },
    delivery_phone: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    initialAutoIncrement: 80000,
  }
);

db.sync()
  .then(() => {
    console.log("Orders table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced Orders table", error);
  });

module.exports = Orders;
