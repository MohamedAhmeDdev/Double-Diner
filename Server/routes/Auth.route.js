const { login, signup , getUserById  } = require("../controllers/User.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
AuthRouter.get("/:id", getUserById);



module.exports = AuthRouter;
