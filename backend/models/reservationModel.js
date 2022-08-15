import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
const reservation = db.define('reservation',{
    fullName:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.INTEGER
    },
    tableFor:{
        type:DataTypes.INTEGER
    },
    time:{
        type:DataTypes.TIME
    },
    dateReserve:{
        type:DataTypes.DATE
    }
},{
    freezeTableName: true
});




export default reservation;

