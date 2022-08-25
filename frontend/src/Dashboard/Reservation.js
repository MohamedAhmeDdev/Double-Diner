import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/Reservation.css'

function Reservation() {
    const [reservation, setReservation] =useState([])
    
    const getReservation = async () =>{
        const reservation = await axios.get('http://localhost:5000/Reservation')
        setReservation(reservation.data)
        }

        useEffect(() =>{
            getReservation()
        },[]);


        const deleteReservation = async(id) =>{
            await axios.delete(`http://localhost:5000/Reservation/${id}`)
            getReservation();
        }


  return (
    <div className='reservation-container'>
        <table className='reservation-table'>
            <thead>
                <tr>
                    <th>Names</th>
                    <th>Phone Number</th>
                    <th>Table For</th>
                    <th>Date Reserved</th>
                    <th>Time Reserved</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {reservation.map((data,id) =>(
                    <tr key={id}>
                        <td>{data.fullName}</td>
                        <td>{data.phone}</td>
                        <td>{data.tableFor}</td>
                        <td>{data.dateReserve}</td>
                        <td>{data.time}</td>
                        <td><button className='remove-button' onClick={ () => deleteReservation(data.id) }>Remove</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Reservation