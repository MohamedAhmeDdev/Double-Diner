import express from "express";
import{
    createInventory,
    getInventory,
    getInventoryById,
    deleteInventory,
    updateInventory
}from "../controllers/inventoryController.js";

const router = express.Router();
router.post('/', createInventory);
router.get('/', getInventory);
router.get('/:id', getInventoryById);
router.delete('/:id', deleteInventory);
router.patch('/:id', updateInventory);

export default router;
