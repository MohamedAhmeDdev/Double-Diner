import {
  UpdateRole,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../../controllers/User.controller";

const UserAdminRouter = require("express").Router();

UserAdminRouter.get("/", getAllUsers);
UserAdminRouter.get("/:id", getUserById);
UserAdminRouter.patch("/updateRole", UpdateRole);
UserAdminRouter.delete("/:id", deleteUserById);

module.exports = UserAdminRouter;
