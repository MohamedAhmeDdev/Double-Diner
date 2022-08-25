import menu from "../models/menuModel.js";

export const createMenu = async(req, res) => {
    try {
        await menu.create(req.body);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    } 
}

export const getMenu = async(req, res) => {
    try {
        const menus = await menu.findAll();
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getMenuById = async (req, res) => {
    try {
        const menu = await menu.findAll({
            where: {
                id: req.params.id 
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 


export const deleteMenu = async (req, res) => {
    try {
        await menu.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "menu Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}