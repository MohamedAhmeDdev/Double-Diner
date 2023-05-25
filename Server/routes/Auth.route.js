const {
     login, signup ,updateDetails, getUserById, forgotPassword ,resetPassword
}= require("../controllers/User.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
AuthRouter.post("/forgotPassword", forgotPassword);
AuthRouter.get("/:id", getUserById);
AuthRouter.put("/reset/:id", resetPassword);
AuthRouter.patch("/:id", updateDetails);



module.exports = AuthRouter;
