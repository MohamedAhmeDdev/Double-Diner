import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";


function Staff() {

    const [staff, setStaff] = useState([]);

    const getInventory = async () => {
        const inventory = await axios.get('http://localhost:5000/staff')
        setStaff(inventory.data)
      }
    
      useEffect(() => {
        getInventory();
      }, []);
    
    
      const deleteStaff = async (id) => {
        await axios.delete(`http://localhost:5000/staff/${id}`)
        getInventory();
      }
    
    
  return (
    <div className='reservation-container'>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>IdNo</th>
            <th>fullName</th>
            <th>Department</th>
            <th>image</th>
            <th className='div'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((data, id) => (
            <tr key={data.id}>
              <td>{data.idNo}</td>
              <td>{data.fullName}</td>
              <td>{data.department}</td>
              <td><img src={`http://localhost:5000/${data.image}`} width="100px" height="50px" alt="" /></td>
              <td>
               <div className='div-button'>
                <button className='remove-button' onClick={() => deleteStaff(data.id)}>Remove</button>
                <Link to={`/updateStaff/${data.id}`} className='Update'>Update</Link>
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Staff