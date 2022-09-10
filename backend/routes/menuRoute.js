const{
    menu,
    getShakesMenu,
    getJuiceMenu,
    getMealMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    upload
}= require ('../controllers/menuController.js')



const router = require('express').Router()
router.post('/',upload ,menu)
router.get('/getShakesMenu',getShakesMenu)
router.get('/getMealMenu',getMealMenu)
router.get('/getJuiceMenu',getJuiceMenu)
router.get('/',getMealMenu)
router.get('/:id',getMenuById)
router.put('/:id',updateMenu)
router.delete('/:id', deleteMenu)
module.exports = router