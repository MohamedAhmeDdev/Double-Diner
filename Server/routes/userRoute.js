const {
    createUsers,
    verifyUser,
    verifyAdmin,
    getUsers,
    updateUser
} = require("../controllers/userController.js");

const router = require('express').Router()
router.post('/', createUsers);
router.post('/verifyAdmin', verifyAdmin);
router.post('/verifyUser', verifyUser)
router.get('/', getUsers);
router.patch('/:id', updateUser);

module.exports = router


