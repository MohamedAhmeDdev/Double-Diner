import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/style.css'

function Reservation() {
    const [reservation, setReservation] = useState([])

    const getReservation = async () => {
        const reservation = await axios.get('http://localhost:5000/Reservation')
        setReservation(reservation.data)
    }

    useEffect(() => {
        getReservation()
    }, []);


    const deleteReservation = async (id) => {
        await axios.delete(`http://localhost:5000/Reservation/${id}`)
        getReservation();
    }


    return (
        <div className='container-table'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Numbers</th>
                        <th>Names</th>
                        <th>Phone Number</th>
                        <th>Table For</th>
                        <th>Date Reserved</th>
                        <th>Time Reserved</th>
                        <th className='div-reservation'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {reservation.map((data, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{data.fullName}</td>
                            <td>{data.phone}</td>
                            <td>{data.tableFor}</td>
                            <td>{data.dateReserve}</td>
                            <td>{data.time}</td>
                            <td>
                            <div className='div-button-reservation'>
                            <button className='remove-button-reservation' onClick={() => deleteReservation(data.id)}>Remove</button>    
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Reservation