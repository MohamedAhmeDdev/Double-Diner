import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";

import '../css/Inventory.css'

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const getInventory = async () => {
    const inventory = await axios.get('http://localhost:5000/inventory')
    setInventory(inventory.data)
  }

  useEffect(() => {
    getInventory();
  }, []);


  const deleteInventory = async (id) => {
    await axios.delete(`http://localhost:5000/inventory/${id}`)
    getInventory();
  }


  return (
    <div className='reservation-container'>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date</th>
            <th className='div'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((data, id) => (
            <tr key={data.id}>
              <td>{data.item}</td>
              <td>{data.price}</td>
              <td>{data.quantity}</td>
              <td>{data.date}</td>
              <td>
               <div className='div-button'>
                <button className='remove-button' onClick={() => deleteInventory(data.id)}>Remove</button>
                <Link to={`/updateInventory/${data.id}`} className='Update'>Update</Link>
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inventory;