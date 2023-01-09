const { login, signup ,updateDetails, getUserById  } = require("../controllers/User.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
AuthRouter.get("/:id", getUserById);
AuthRouter.patch("/:id", updateDetails);



module.exports = AuthRouter;
