const AdminCategoryRouter = require("express").Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/Category.controller");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminCategoryRouter.use(verifyToken);
AdminCategoryRouter.use(isAdmin);

AdminCategoryRouter.route("/").post(createCategory).get(getAllCategories);


AdminCategoryRouter.route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory)

module.exports = AdminCategoryRouter;
