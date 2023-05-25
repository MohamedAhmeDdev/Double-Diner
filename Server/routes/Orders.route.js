const OrderRouter = require("express").Router();

const {
  createToken,
  createOrder,
  getAllOrdersForUser,
  getOrderForUserById,
  updateOrderForUserById,
  deleteOrderById,
} = require("../controllers/Orders.controller");

const { verifyToken } = require("../middleware/VerifyToken");

OrderRouter.use(verifyToken);

OrderRouter.route("/").post( createToken, createOrder).get(getAllOrdersForUser);

OrderRouter.route("/:id")
  .get(getOrderForUserById)
  .patch(updateOrderForUserById)
  .delete(deleteOrderById);

module.exports = OrderRouter;
