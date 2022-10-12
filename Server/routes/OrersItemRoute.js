const {
    createOrderedItem,
    getOrderedItem,
    getOrderedItemById,
    deleteOrderedItem
} = require("../controllers/OrdresItemController.js");

const router = require('express').Router()
router.post('/', createOrderedItem);
router.get('/', getOrderedItem);
router.get('/', getOrderedItemById);
router.delete('/:id', deleteOrderedItem);

module.exports = router;

