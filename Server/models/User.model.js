const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig.js");

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

db.sync()
  .then(() => {
    console.log("Users  table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Users table", error);
  });

module.exports = Users;
