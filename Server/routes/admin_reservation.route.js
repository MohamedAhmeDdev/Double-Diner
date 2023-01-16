const AdminReservationRouter = require("express").Router();
const {
  getAllReservation,
  getReservationById,
  deleteReservation,
} = require("../controllers/ReservationController");

const { verifyToken, isAdmin } = require("../middleware/VerifyToken");

AdminReservationRouter.use(verifyToken);
AdminReservationRouter.use(isAdmin);

AdminReservationRouter.route("/").get(getAllReservation);
AdminReservationRouter.route("/:id")
.get(getReservationById)
.delete(deleteReservation);

module.exports = AdminReservationRouter;
