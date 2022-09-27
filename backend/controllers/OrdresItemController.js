const orderedItem = require("../models/orderedItems")

const createOrderedItem = async (req, res) => {
    try {
        await orderedItem.create(req.body)
        res.json({ "message": "Created" });
    } catch (error) {
        res.json({ message: error.message });
    }
}


const getOrderedItem = async (req, res) => {
    try {
        const OrdersItem = await orderedItem.findAll();
        res.json(OrdersItem);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const getOrderedItemById = async (req, res) => {
    let id = req.params.id
    try {
        const OrdersItem = await orderedItem.findOne({
            where: { id: id }
        });
        res.status(200).send(OrdersItem)
    } catch (error) {
        res.json({ message: error.message });
    }
}



const deleteOrderedItem = async (req, res) => {
    try {
        await orderedItem.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}


module.exports = {
    createOrderedItem,
    getOrderedItem,
    getOrderedItemById,
    deleteOrderedItem

}