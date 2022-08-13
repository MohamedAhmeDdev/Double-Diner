import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const user = db.define('useraccount',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type:DataTypes.INTEGER
    }
},{
    freezeTableName: true
});


export default user;
