const staff = require("../models/StaffModel.js")

// image Upload
const multer = require('multer')
const path = require('path')

const createStaff = async (req, res) => {
    let info = {
        image: req.file.path,
        fullName: req.body.fullName,
        idNo: req.body.idNo,
        department: req.body.department,
    }

    try {
        await staff.create(info);
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getStaff = async (req, res) => {
    try {
        const staffs = await staff.findAll();
        res.json(staffs);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getStaffById = async (req, res) => {
    let id = req.params.id
    try {
        const staffs = await staff.findOne({
            where: { id: id }
        });
        res.status(200).send(staffs)
    } catch (error) {
        res.json({ message: error.message });
    }
}


const deleteStaff = async (req, res) => {
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


const updateStaff = async (req, res) => {
    let id = req.params.id
    let update = {
        image: req.file.path,
        fullName: req.body.fullName,
        idNo: req.body.idNo,
        department: req.body.department,
    }
    try {
        await staff.update(update, { where: { id: id } });
        res.json({
            "message": "Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



module.exports = {
    createStaff,
    getStaff,
    getStaffById,
    deleteStaff,
    updateStaff,
    upload
}