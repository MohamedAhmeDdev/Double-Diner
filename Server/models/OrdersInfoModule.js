const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const orderInfo = db.define(
  "customerorders",
  {
    fullName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    priceTotal: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);

db.sync()
  .then(() => {
    console.log("OrderInfo  table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create OrderInfo table", error);
  });

module.exports = orderInfo;
