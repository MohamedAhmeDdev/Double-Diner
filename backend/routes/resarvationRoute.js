const{ 
    createReservation,
    getReservation,
    deleteReservation
}=require ("../controllers/reservationController.js");
 
const router = require('express').Router() 
router.post('/', createReservation);
router.get('/', getReservation);
router.delete('/:id', deleteReservation);
 
module.exports = router;

 