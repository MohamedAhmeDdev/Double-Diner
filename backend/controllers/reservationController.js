import reservation from "../models/reservationModel.js";


export const  createReservation = async (req, res) => {
    const {time} = req.body

    const ifReservationExists = await reservation.findOne({where:{time:time}})
    if(ifReservationExists){
        return res.sendStatus(401)
    }else{
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
