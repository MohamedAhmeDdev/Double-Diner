const AdminOrdersRouter = require("express").Router();

const {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderById,
} = require("../controllers/Orders.controller");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminOrdersRouter.use(verifyToken);
AdminOrdersRouter.use(isAdmin);

AdminOrdersRouter.route("/").get(getAllOrders).post(createOrder);

AdminOrdersRouter.route("/:id")
  .get(getOrderById)
  .patch(updateOrderById)
  .delete(deleteOrderById);

module.exports = AdminOrdersRouter;
