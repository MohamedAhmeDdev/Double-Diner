import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
const menu = db.define('menu',{
    picture:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    foodName:{
        type: DataTypes.STRING
    },
    foodType:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default menu