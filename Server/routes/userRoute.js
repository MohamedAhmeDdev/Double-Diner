const {
    createUsers,
    verifyUser,
    verifyAdmin,
    getUsers
} = require("../controllers/userController.js");

const router = require('express').Router()
router.post('/', createUsers);
router.post('/verifyAdmin', verifyAdmin);
router.post('/verifyUser', verifyUser)
router.get('/', getUsers);

module.exports = router


