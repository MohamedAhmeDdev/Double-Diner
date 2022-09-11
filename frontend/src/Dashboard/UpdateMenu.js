import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/AddMenu.css'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMenu() {
    const [foodName, setFoodName] = useState('')
    const [price, setPrice] = useState()
    const [foodType, setFoodType] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

    const UpdateMenu = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/menu/${id}`, {
        foodName: foodName,
        foodType: foodType,
        price: price
        })
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
            <form className='formMenu' onSubmit={UpdateMenu} >
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