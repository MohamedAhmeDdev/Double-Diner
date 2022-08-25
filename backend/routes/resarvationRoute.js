import express from "express"; 
import { 
    createReservation,
    getReservation,
    deleteReservation
} from "../controllers/reservationController.js";
 
const router = express.Router();
router.post('/', createReservation);
router.get('/', getReservation);
router.delete('/:id', deleteReservation);
 
export default router;

 