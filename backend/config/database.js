import sequelize from "sequelize";


const db = new sequelize('double_diner', 'root', '',{
    host:"localhost",
    dialect: "mysql"
});

export default db;