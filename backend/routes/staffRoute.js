const {
    createStaff,
    getStaff,
    getStaffById,
    deleteStaff,
    updateStaff,
    upload
} = require("../controllers/staffController.js")

const router = require('express').Router()
router.post('/', upload, createStaff);
router.get('/', getStaff);
router.get('/:id', getStaffById);
router.delete('/:id', deleteStaff);
router.patch('/:id', updateStaff);


module.exports = router;