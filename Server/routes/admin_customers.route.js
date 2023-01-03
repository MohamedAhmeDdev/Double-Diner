const AdminUsersRouter = require("express").Router();
const {
  getUserById,
  deleteUserById,
  getAllUsers,
} = require("../controllers/User.controller");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminUsersRouter.use(verifyToken);
AdminUsersRouter.use(isAdmin);

AdminUsersRouter.route("/").get(getAllUsers);
AdminUsersRouter.route("/:id").get(getUserById).delete(deleteUserById);

module.exports = AdminUsersRouter;
