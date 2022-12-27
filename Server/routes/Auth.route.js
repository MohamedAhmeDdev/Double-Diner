const { login, signup } = require("../controllers/User.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);

module.exports = AuthRouter;
