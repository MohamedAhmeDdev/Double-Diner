const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

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
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dishes',
        key: 'dish_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    initialAutoIncrement: 100,
  }
);

module.exports = OrderDishes;