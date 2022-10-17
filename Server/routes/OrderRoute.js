const {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController.js");

const router = require('express').Router()
router.post('/', createOrder);
router.get('/', getOrder);
router.get('/:id', getOrderById);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;

