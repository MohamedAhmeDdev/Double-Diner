const {
    createOrder,
    getOrder,
    getOrderById,
    deleteOrder
} = require("../controllers/orderController.js");

const router = require('express').Router()
router.post('/', createOrder);
router.get('/', getOrder);
router.get('/', getOrderById);
router.delete('/:id', deleteOrder);

module.exports = router;

