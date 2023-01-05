const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
  getDishesInCategory,
} = require("../controllers/Dishes.controller");

const uploadImage = require("../middleware/UploadImage");

const DishesRouter = require("express").Router();

DishesRouter.route("/").post(uploadImage, createDish).get(getAllDishes);

// query params localhost:5000/dishes/list?category=veg
DishesRouter.route("/list").get(getDishesInCategory);

DishesRouter.route("/:id")
  .get(getDishById)
  .patch(updateDish)
  .delete(deleteDish);

module.exports = DishesRouter;
