import React, { useState } from 'react'
import axios from "axios"
import '../css/AddMenu.css'

const AddMenu = () => {
  const [picture, setPicture] = useState('')
  const [price, setPrice] = useState('')
  const [foodName, setFoodName] = useState('')
  const [foodType, setFoodType] = useState('')

  const menu = async (e) =>{
    e.preventDefault();
    await axios.post('http://localhost:5000/menu',{
      picture: picture,
      price: price,
      foodName: foodName,
      foodType: foodType
    })
  }


  return (
    <div className='container-AddMenu'>
      <form className='formMenu' onSubmit={menu}>
        <label htmlFor="item" className='menuLabel'>Picture</label> <br />
        <input className="menuInputFile" type="file" value={picture} onChange={(e) => setPicture(e.target.value)}/>
        <br /><br />

        <label htmlFor="price" className='menuLabel'>Price</label><br />
        <input className='menuInput' type="text"  value={price} onChange={(e) => setPrice(e.target.value)}/>
        <br /><br />

        <label htmlFor="Food Name" className='menuLabel'>Food Name</label> <br />
        <input className='menuInput' type="text"  value={foodName} onChange={(e) => setFoodName(e.target.value)}/>
        <br /><br />

        <label htmlFor="Food type" className='menuLabel'>Food type</label> <br />
        <input className='menuInput' type="text"  value={foodType} onChange={(e) => setFoodType(e.target.value)}/>
        <br /><br />

        <button className='submitMenu' type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddMenu