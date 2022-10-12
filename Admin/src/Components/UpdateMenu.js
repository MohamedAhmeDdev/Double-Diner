import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/AddMenu.css'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMenu() {
  const [foodName, setFoodName] = useState('')
  const [price, setPrice] = useState()
  const [foodType, setFoodType] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  const UpdateMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('foodType', foodType)
    formData.append('price', price)
    formData.append('foodName', foodName)
    formData.append('image', image)

    await axios.patch(`http://localhost:5000/menu/${id}`, formData)
    navigate("/Menu");
  }

  const getMenuById = async () => {
    const response = await axios.get(`http://localhost:5000/menu/${id}`);
    setFoodName(response.data.foodName);
    setFoodType(response.data.foodType);
    setPrice(response.data.price);
  }

  useEffect(() => {
    getMenuById();
  }, []);

  return (
    <div className='container-AddMenu'>
      <form className='formMenu' onSubmit={UpdateMenu} method="POST" encType='multipart/form-data'>
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
        <input className='menuInput' type="text" value={foodType} onChange={(e) => setFoodType(e.target.value)} />
        <br /><br />

        <button className='submitMenu' type="submit">Add</button>
      </form>
    </div>
  )
}

export default UpdateMenu