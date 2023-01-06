const {
  createDish,
  getAllDishes,
  getDishById,
  getDishesInCategory,
} = require("../controllers/Dishes.controller");

const uploadImage = require("../middleware/UploadImage");

const DishesRouter = require("express").Router();

DishesRouter.route("/").get(getAllDishes);

// query params localhost:5000/dishes/list?category=veg
DishesRouter.route("/list").get(getDishesInCategory);

DishesRouter.route("/:id").get(getDishById);

module.exports = DishesRouter;
