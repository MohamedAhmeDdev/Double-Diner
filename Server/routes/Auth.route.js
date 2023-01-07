const { login, signup , updateDetails } = require("../controllers/User.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
AuthRouter.patch('/:id', updateDetails);

module.exports = AuthRouter;
