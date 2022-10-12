import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/Reservation.css'


const Reservaton = () => {
  const [message, setMessage] = useState(false)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableFor, setTableFor] = useState('');
  const [time, setTime] = useState('');
  const [dateReserve, setDateReserve] = useState('');
  const [errors, setErrors] = useState(false)


  const reservation = async (e) => {
    e.preventDefault();
    try {
     const reserve = await axios.post('http://localhost:5000/reservation', {
        fullName: fullName,
        phone: phone,
        tableFor: tableFor,
        time: time,
        dateReserve: dateReserve,
        
      })
      {
        //it remove the data which is in the input
        setFullName('');
        setDateReserve('');
        setPhone('');
        setTableFor('');
        setTime('');
        setMessage("Reservation Booked")
      }  
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors("already reserved choose another time");
      } else if (error.response?.status === 402) {
        setMessage("Fill In The Fields")
      }
    }
  }


  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(false);
      }, 2000);
    }
  }, [message]);

  return (
    <div className='reservation-container'>
      <div className='display-form'>
        <div className='form-container'>
          {message && <p className='messageDiv'>{message}</p>}

          <form className='reservationForm' onSubmit={reservation}>
            <div>

              <label htmlFor="name" className='reservationLabel'>fullName</label><br />
              <input className="reservationInput" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <br />

              <label htmlFor="name" className='reservationLabel'>Table For</label><br />
              <input className="reservationInput" type="text" value={tableFor} onChange={(e) => setTableFor(e.target.value)} />
              <br />

              <label htmlFor="time" className='reservationLabel'>Time</label><br />
              <input className='reservationInput' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <br />

            </div>

            <div className='one'>
              <label htmlFor="phone" className='reservationLabel'>Phone Number</label><br />
              <input className='reservationInput' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <br />

              <label htmlFor="date" className='reservationLabel'>Date</label><br />
              <input className='reservationInput' type="Date" value={dateReserve} onChange={(e) => setDateReserve(e.target.value)} />
              <br />
              {errors && <p className='reservationError'>{errors}</p>}
              <button className='reservation'>Reservation</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reservaton