const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const userAccount = db.define("useraccounts", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

//Create a table if it doesn't exist

db.sync()
  .then(() => {
    console.log("Users  table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Users table", error);
  });

module.exports = userAccount;
