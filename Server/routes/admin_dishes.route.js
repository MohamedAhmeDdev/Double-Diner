const AdminDishesRouter = require("express").Router();

const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
  getDishesInCategory,
} = require("../controllers/Dishes.controller");
const uploadImage = require("../middleware/UploadImage");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminDishesRouter.use(verifyToken);
AdminDishesRouter.use(isAdmin);

AdminDishesRouter.route("/").post(uploadImage, createDish).get(getAllDishes);

// query params localhost:5000/dishes/list?category=veg
AdminDishesRouter.route("/list").get(getDishesInCategory);

AdminDishesRouter.route("/:id")
  .get(getDishById)
  .patch(uploadImage ,updateDish)
  .delete(deleteDish);

module.exports = AdminDishesRouter;
