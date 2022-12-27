const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const staff = db.define(
  "staff",
  {
    idNo: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

db.sync()
  .then(() => {
    console.log("Staff  table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Staff table", error);
  });

module.exports = staff;
