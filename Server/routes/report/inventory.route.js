const AdminReportDishRouter = require("express").Router();
const {
    getDishForReport
} = require("../../controllers/Report/Inventory");

const { verifyToken, isAdmin } = require("../../middleware/VerifyToken");

AdminReportDishRouter.use(verifyToken);
AdminReportDishRouter.use(isAdmin);

AdminReportDishRouter.route("/").get(getDishForReport);


module.exports = AdminReportDishRouter;



