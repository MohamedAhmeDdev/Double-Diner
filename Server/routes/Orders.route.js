const OrderRouter = require("express").Router();

const {
  createOrder,
  getAllOrdersForUser,
  getOrderForUserById,
  updateOrderForUserById,
  deleteOrderById,
} = require("../controllers/Orders.controller");

const { verifyToken } = require("../middleware/VerifyToken");

OrderRouter.use(verifyToken);

OrderRouter.route("/").post(createOrder).get(getAllOrdersForUser);

OrderRouter.route("/:id")
  .get(getOrderForUserById)
  .put(updateOrderForUserById)
  .delete(deleteOrderById);

module.exports = OrderRouter;
