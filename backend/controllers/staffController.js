import staff from "../models/StaffModel.js"

export const  createStaff = async(req, res) => {
    try {
        await staff.create(req.body);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    } 
}

export const getStaff = async(req, res) => {
    try {
        const staffs = await staff.findAll();
        res.json(staffs);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getStaffById = async (req, res) => {
    try {
        const staffs = await staff.findAll({
            where: {
                id: req.params.id 
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 


export const deleteStaff = async (req, res) => {
    try {
        await staff.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


export const  updateStaff = async (req, res) => {
    try {
        await staff.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}