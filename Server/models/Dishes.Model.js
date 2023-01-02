const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const Dishes = db.define(
  "dishes",
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

db.sync()
  .then(() => {
    console.log("Dishes table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced Dishes table", error);
  });

module.exports = Dishes;
