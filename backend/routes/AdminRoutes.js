const {
    verifyAdmin,
    getAdmin
} = require("../controllers/adminController.js");

const router = require('express').Router()
router.get('/verifyAdmin', getAdmin);
router.post('/verifyAdmin', verifyAdmin)

module.exports = router


