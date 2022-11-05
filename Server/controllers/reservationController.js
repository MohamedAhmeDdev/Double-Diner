
const reservation = require("../models/reservationModel.js")


const createReservation = async (req, res) =>{
    const { time, fullName,phone,tableFor,dateReserve } = req.body

    if (time.length === 0 || fullName.length === 0 || phone.length < 4 || tableFor.length < 4 || dateReserve.length < 4) {
        return res.sendStatus(400)
      }

    const ifReservationExists = await reservation.findOne({ where: { time: time } })  // find time in database
    if (ifReservationExists) {  // if the time much send 401
        return res.sendStatus(401)
    } else {
        try {
            await reservation.create(req.body);
            res.json({
                "message": "Created"
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }
}

const getReservation = async (req, res) => {
    try {
        const reservations = await reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const deleteReservation = async (req, res) => {
    try {
        await reservation.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "reservation Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {
    createReservation,
    getReservation,
    deleteReservation,

}