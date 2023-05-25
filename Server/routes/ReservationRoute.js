const ReservationRoute = require("express").Router();

const {
    createReservation,
} = require("../controllers/ReservationController");

const { verifyToken } = require("../middleware/VerifyToken");

ReservationRoute.use(verifyToken);

ReservationRoute.route("/").post(createReservation)



module.exports = ReservationRoute;
