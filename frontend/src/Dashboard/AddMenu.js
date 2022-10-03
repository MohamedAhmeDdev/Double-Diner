import React, { useState } from 'react'
import axios from "axios"
import '../css/AddMenu.css'
import { useNavigate } from 'react-router-dom';

const AddMenu = () => {
  const [foodName, setFoodName] = useState('')
  const [price, setPrice] = useState()
  const [foodType, setFoodType] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();

  const menu = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('foodType', foodType)
    formData.append('price', price)
    formData.append('foodName', foodName)
    formData.append('image', image)

    await axios.post('http://localhost:5000/menu', formData)
    navigate("/Menu");
  }


  return (
    <div className='container-AddMenu'>
      <form className='formMenu' onSubmit={menu} method="POST" encType='multipart/form-data'>
        <label htmlFor="item" className='menuLabel'>Picture</label> <br />
        <input className="menuInputFile" type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br /><br />

        <label htmlFor="price" className='menuLabel'>Price</label><br />
        <input className='menuInput' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br /><br />

        <label htmlFor="Food Name" className='menuLabel'>Food Name</label> <br />
        <input className='menuInput' type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        <br /><br />

        <label htmlFor="Food type" className='menuLabel'>Food type</label> <br />
        <select className='menuInput' type="text" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
          <option></option>
          <option>Meal</option>
          <option>Juice</option>
          <option>Shakes</option>
        </select>
        <br /><br />

        <button className='submitMenu' type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddMenu



