const order =require("../models/OrderModule.js")

const createOrder = async(req, res) => {
    try {
        await order.create(req.body);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    } 
}
const getOrder = async(req, res) => {
    try {
        const Orders = await order.findAll();
        res.json(Orders);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
 const getOrderById = async (req, res) => {
    let id = req.params.id
    try {
        const Orders = await order.findOne({
            where: { id: id }});
            res.status(200).send(Orders)
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 


 const deleteOrder = async (req, res) => {
    try {
        await order.destroy({
            where: {id: req.params.id }});
        res.json({
            "message": "inventory Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


module.exports = {
 createOrder,
 getOrder,
 getOrderById,
 deleteOrder

}