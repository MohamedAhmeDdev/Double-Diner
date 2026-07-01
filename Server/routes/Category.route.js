const CategoryRouter = require("express").Router();

const {
  getAllCategories,
} = require("../controllers/Category.controller");



CategoryRouter.route("/").get(getAllCategories);

module.exports = CategoryRouter;
