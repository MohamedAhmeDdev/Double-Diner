const { 
    verifyUser
}= require ("../controllers/userLogin.js");
 

const router = require('express').Router() 
router.post('/', verifyUser);

module.exports = router;

 
