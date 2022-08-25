import express from "express"
import {
    createStaff,
    getStaff,
    getStaffById,
    deleteStaff,
    updateStaff
}from "../controllers/staffController.js"

const router = express.Router();
router.post('/', createStaff);
router.get('/', getStaff);
router.get('/:id', getStaffById);
router.delete('/:id', deleteStaff);
router.patch('/:id', updateStaff);


export default router;