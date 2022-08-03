import React from 'react'
import '../css/Reservation.css'
import Footer from './Footer'

function Reservaton() {
  return (
    <div className='reservation-container'>
      <div className='display-form'>
        <div className='form-container'>
          <form className='reservationForm'>
            <div>

              <label htmlFor="name" className='reservationLabel'>fullName</label><br />
              <input className="reservationInput" type="text" />

              <br /><br /><br />

              <label htmlFor="name" className='reservationLabel'>Table For</label><br />
              <input className="reservationInput" type="text" />
              <br /><br /><br />

              <label htmlFor="time" className='reservationLabel'>Time</label><br />
              <input className='reservationInput' type="time" />
              <br /><br /><br />

            </div>

            <div className='one'>
              <label htmlFor="phone" className='reservationLabel'>Phone Number</label><br />
              <input className='reservationInput' type="text" />
              <br /><br /><br />

              <label htmlFor="phone" className='reservationLabel'>Reservation For</label><br />
              <select className='reservationOption'>
                <option></option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option></option>
              </select>
              <br /><br /><br />

              <label htmlFor="date" className='reservationLabel'>Date</label><br />
              <input className='reservationInput' type="Date" />
              <br /><br />
              <button className='reservation'>Reservation</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Reservaton