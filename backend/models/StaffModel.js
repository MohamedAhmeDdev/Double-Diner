import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
const staff = db.define('staff',{
    idNo:{
        type:DataTypes.STRING
    },
    fullName:{
        type:DataTypes.STRING
    },
    department:{
        type:DataTypes.STRING
    },
    picture:{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default staff