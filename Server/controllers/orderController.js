const orderInfo = require("../models/OrdersInfoModule.js")
const orderedItem = require("../models/orderedItems")

const createOrder = async (req, res) => {
    try {
        const { order_info, items } = req.body;

        //create order in orders table
        const myOrder = await orderInfo.create(order_info)
        const order_id = myOrder.dataValues.id;

        items.forEach(async item => {
            await orderedItem.create({
                ...item,
                order_id
            })
        });

        res.json({ "message": "Created" });
    } catch (error) {
        res.json({ message: error.message });
    }
}


const getOrder = async (req, res) => {
    try {
        const Orders = await orderInfo.findAll();
        res.json(Orders);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const getOrderById = async (req, res) => {
    let id = req.params.id
    try {
       let Orders = await orderInfo.findOne({
            where: { id: id }
        });
        res.status(200).send(Orders)
    } catch (error) {
        res.json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        await orderInfo.update(req.body, {
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


const deleteOrder = async (req, res) => {
    try {
        await orderInfo.destroy({
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
    createOrder,
    getOrder,
    getOrderById,
    deleteOrder,
    updateOrder
}