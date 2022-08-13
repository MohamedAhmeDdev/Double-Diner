import express from "express"; 
import { 
    verifyUser
} from "../controllers/userLogin.js";
 
const router = express.Router();
 
router.post('/', verifyUser);

export default router;

 
