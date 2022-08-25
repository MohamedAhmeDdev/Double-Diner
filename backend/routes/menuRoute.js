import  express  from "express";
import{
    createMenu,
    getMenu,
    getMenuById,
    deleteMenu
}from "../controllers/menuController.js";

const router = express.Router();
router.post('/', createMenu);
router.get('/', getMenu);
router.get('/:id', getMenuById);
router.delete('/:id', deleteMenu);

export default router;