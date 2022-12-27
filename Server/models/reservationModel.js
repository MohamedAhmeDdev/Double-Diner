const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const reservation = db.define("reservation", {
  fullName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  tableFor: {
    type: DataTypes.INTEGER,
  },
  time: {
    type: DataTypes.TIME,
  },
  dateReserve: {
    type: DataTypes.DATE,
  },
});
db.sync()
  .then(() => {
    console.log("Reservations  table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Reservations table", error);
  });

module.exports = reservation;
