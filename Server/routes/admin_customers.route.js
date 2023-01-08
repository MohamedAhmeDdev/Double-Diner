const AdminUsersRouter = require("express").Router();
const {
  getUserById,
  deleteUserById,
  updateRole,
  getAllUsers,
} = require("../controllers/User.controller");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminUsersRouter.use(verifyToken);
AdminUsersRouter.use(isAdmin);

AdminUsersRouter.route("/").get(getAllUsers);
AdminUsersRouter.route("/:id")
.get(getUserById)
.patch(updateRole)
.delete(deleteUserById);

module.exports = AdminUsersRouter;
