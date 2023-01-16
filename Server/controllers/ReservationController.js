const Reservation = require("../models/ReservationModel");
const nodemailer =require('nodemailer')

const createReservation = async (req, res) => {
  const {fullName, phone, tableFor, time, dateReserve } = req.body;
  const User_Id = req.user.id;
  const userReservation = await Reservation.findOne({ where: { User_Id } });

   const formatDateTime = (date) => {
    const _date = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${_date}`;
  };
  

  try {
      if(fullName.length < 0 || phone.length < 0 || tableFor.length < 0 || time.length < 0 || dateReserve.length < 0){
        res.status(400).json({ success: false
        });
      }else if(
        await Reservation.create({ User_Id, fullName, phone, tableFor, time, dateReserve })
      )
      {
        const transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user:'ma07041705@gmail.com',
            pass:"uagrmlhtgykwbrrr"
          }
        })
    
        const mailOption={
          from:'Double Diner Restaurant',
          to: 'ma07041705@gmail.com',
          subject:'Reservation Request for ' +  userReservation.name + '',
          html:'<p>You Booked a reservation, Double Diner Restaurant table for '+ userReservation.tableFor +' on a ' + formatDateTime(userReservation.dateReserve) +' at '+ userReservation.time +'</p>'
            +'thank you for dining with us'
        }
      
        transporter.sendMail(mailOption,(err ,response)=>{
          if(err){
            console.log('There was an error',err);
          }else{
            console.log('There was a response ',response);
            res.status(200).json('recovery email sent ')
          }
        })
      }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getAllReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findAll();
    return res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




const getReservationById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    return res.status(200).json({success: true});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};






const deleteReservation = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    await Reservation.destroy({ where: { id } });
    return res.status(200).json({ success: true, });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};






module.exports = {
  createReservation,
  getAllReservation,
  getReservationById,
  deleteReservation,
};
