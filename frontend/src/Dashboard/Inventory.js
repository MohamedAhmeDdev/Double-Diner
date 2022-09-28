import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import '../css/style.css'

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');

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

  const filterInventory = inventory.filter(inventory => {
    return inventory.item.toLowerCase().includes(search.toLowerCase())
  })



  return (
    <div className='container-table'>
      <div className='search-box'>
        <input className="search" type="search" onChange={e => setSearch(e.target.value)} placeholder="item" />
      </div>
      <table className='table'>
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
          {filterInventory.map((data, id) => (
            <tr key={data.id}>
              <td>{data.item}</td>
              <td>{data.price}</td>
              <td>{data.quantity}</td>
              <td>{data.date}</td>
              <td>
                <div className='div-button'>
                  <button className='remove-button' onClick={() => deleteInventory(data.id)}>Remove</button>
                  <p className='Update'><Link to={`/updateInventory/${data.id}`} className='Update'>Update</Link></p>
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