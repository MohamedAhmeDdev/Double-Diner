const menus = require("../models/menuModel.js")

// image Upload
const multer = require('multer')
const path = require('path')


const menu = async (req, res) => {
    let info = {
        image: req.file.path,
        foodName: req.body.foodName,
        price: req.body.price,
        foodType: req.body.foodType,
    }
    try {
        const menu = await menus.create(info)
        res.status(200).send(menu)
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getMenu = async (req, res) => {
    let menu = await menus.findAll()
    res.status(200).send(menu)

}

const getMealMenu = async (req, res) => {
    let menu = await menus.findAll({ where: { foodType: 'meal' } })
    res.status(200).send(menu)

}

const getJuiceMenu = async (req, res) => {
    let menu = await menus.findAll({ where: { foodType: 'juice' } })
    res.status(200).send(menu)

}


const getShakesMenu = async (req, res) => {
    let menu = await menus.findAll({ where: { foodType: 'shakes' } })
    res.status(200).send(menu)

}

const getMenuById = async (req, res) => {
    let id = req.params.id
    let menu = await menus.findOne({ where: { id: id } })
    res.status(200).send(menu)

}


const updateMenu = async (req, res) => {
    let id = req.params.id
    const menu = await menus.update(req.body, { where: { id: id } })
    res.status(200).send(menu)
}


const deleteMenu = async (req, res) => {
    let id = req.params.id

    await menus.destroy({ where: { id: id } })

    res.status(200).send('Product is deleted !')

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
    menu,
    getMenu ,
    getShakesMenu,
    getJuiceMenu,
    getMealMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    upload
}