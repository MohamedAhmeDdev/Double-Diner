import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import '../css/style.css'

function Staff() {

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');

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

  const filterStaff = staff.filter(staff => {
    return staff.fullName.toLowerCase().includes(search.toLowerCase())
  })



  return (
    <div className='container-table'>
      <div className='search-box'>
        <input className="search" type="search" onChange={e => setSearch(e.target.value)} placeholder="FullName" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>IdNo</th>
            <th>fullName</th>
            <th>Department</th>
            <th>image</th>
            <th className='div-staff'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filterStaff.map((data, id) => (
            <tr key={data.id}>
              <td>{data.idNo}</td>
              <td>{data.fullName}</td>
              <td>{data.department}</td>
              <td><img src={`http://localhost:5000/${data.image}`} width="50px" height="50px" alt="" /></td>
              <td>
                <div className='div-button-staff'>
                  <button className='remove-button-staff' onClick={() => deleteStaff(data.id)}>Remove</button>
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