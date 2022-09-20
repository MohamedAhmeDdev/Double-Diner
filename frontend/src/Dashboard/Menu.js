import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import '../css/style.css'

function Menu() {
    const [menu, setMenu] = useState([]);
    const [search, setSearch] = useState('');


    const getMenu = async () => {
        const inventory = await axios.get('http://localhost:5000/menu')
        setMenu(inventory.data)
      }
    
      useEffect(() => {
        getMenu();
      }, []);
    
    
      const deleteMenu = async (id) => {
        await axios.delete(`http://localhost:5000/menu/${id}`)
        getMenu();
      }

      const filterMenu = menu.filter(menu => {
        return menu.foodName.toLowerCase().includes(search.toLowerCase())
      })
      

    return (
        <div className='reservation-container'>
            <div className='search-box'>
        <input className="search" type="search" onChange={e => setSearch(e.target.value)} placeholder="foodName" />
      </div>
            <table className='inventory-table'>
                <thead>
                    <tr>
                        <th>image</th>
                        <th>foodName</th>
                        <th>foodType</th>
                        <th>price</th>
                        <th className='div'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {filterMenu.map((data, id) => (
                        <tr key={data.id}>
                            <td><img src={`http://localhost:5000/${data.image}`} width="100px" height="50px" alt="" /></td>
                            <td>{data.foodName}</td>
                            <td>{data.foodType}</td>
                            <td>{data.price}</td>
                            <td>
                                <div className='div-button'>
                                    <button className='remove-button' onClick={() => deleteMenu(data.id)}>Remove</button>
                                    <Link to={`/updateMenu/${data.id}`} className='Update'>Update</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Menu