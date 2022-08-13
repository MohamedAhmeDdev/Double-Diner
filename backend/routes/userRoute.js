import express from "express"; 
import { 
    createUsers,
} from "../controllers/userController.js";
 
const router = express.Router();
router.post('/', createUsers);
 
export default router;

 
