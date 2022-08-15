import express from "express"; 
import { 
    createReservation,
} from "../controllers/reservationController.js";
 
const router = express.Router();
router.post('/', createReservation);
 
export default router;

 