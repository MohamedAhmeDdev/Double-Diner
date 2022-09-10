const db = require('../models')
const inventory = db.inventory

 const createInventory = async(req, res) => {
    try {
        await inventory.create(req.body);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    } 
}

  const getInventory = async(req, res) => {
    try {
        const inventorys = await inventory.findAll();
        res.json(inventorys);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
 const getInventoryById = async (req, res) => {
    try {
        const inventory = await inventory.findAll({
            where: {
                id: req.params.id 
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 


 const deleteInventory = async (req, res) => {
    try {
        await inventory.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "inventory Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const  updateInventory = async (req, res) => {
    try {
        await inventory.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

module.exports= {
    createInventory,
    getInventory,
    getInventoryById,
    deleteInventory,
    updateInventory
}