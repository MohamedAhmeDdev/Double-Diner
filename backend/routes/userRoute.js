const {
    createUsers,
    verifyUser
} = require("../controllers/userController.js");

const router = require('express').Router()
router.post('/', createUsers);
router.post('/verifyUser', verifyUser)

module.exports = router


