const {
    createInventory,
    getInventory,
    getInventoryById,
    deleteInventory,
    updateInventory
} = require("../controllers/inventoryController.js");


const router = require('express').Router()
router.post('/', createInventory);
router.get('/', getInventory);
router.get('/:id', getInventoryById);
router.delete('/:id', deleteInventory);
router.patch('/:id', updateInventory);

module.exports = router;
