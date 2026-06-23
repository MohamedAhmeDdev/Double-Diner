const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");


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
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    order_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    order_status: {
      type: DataTypes.ENUM(
        'PENDING',
        'ACCEPTED',
        'REJECTED',
        'READY_FOR_DELIVERY',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED'
      ),
      defaultValue: 'PENDING',
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('cash', 'card'),
      allowNull: true,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
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
    initialAutoIncrement: 80000,
  }
);

module.exports = Orders;
