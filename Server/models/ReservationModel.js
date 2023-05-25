const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const Reservation = db.define(
  "reservation",
  {
    User_Id: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    tableFor: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.STRING,
    },
    dateReserve: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

db.sync()
  .then(() => {
    console.log("Reservation table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced Dishes table", error);
  });

module.exports = Reservation;
