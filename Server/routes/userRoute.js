const {
    createUsers,
    verifyUser,
    getUsers
} = require("../controllers/userController.js");

const router = require('express').Router()
router.post('/', createUsers);
router.get('/verifyUser', getUsers);
router.post('/verifyUser', verifyUser)

module.exports = router


