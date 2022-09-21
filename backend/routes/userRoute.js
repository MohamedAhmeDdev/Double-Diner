const {
    createUsers,
} = require("../controllers/userController.js");

const router = require('express').Router()
router.post('/', createUsers);

module.exports = router


