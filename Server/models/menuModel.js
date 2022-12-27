const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const menu = db.define(
  "menu",
  {
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    foodName: {
      type: DataTypes.STRING,
    },
    foodType: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTablesName: true,
  }
);

db.sync()
  .then(() => {
    console.log("Menu table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Menu table", error);
  });

module.exports = menu;
