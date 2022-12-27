const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const inventory = db.define(
  "inventory",
  {
    item: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

db.sync()
  .then(() => {
    console.log("Inventory table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Details table", error);
  });

module.exports = inventory;
