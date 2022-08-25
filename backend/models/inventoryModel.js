import { Sequelize } from "sequelize";
import db from "../config/database.js";


const {DataTypes} = Sequelize;
const inventory = db.define('inventory',{
    item:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    quantity:{
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true
});

export default inventory;