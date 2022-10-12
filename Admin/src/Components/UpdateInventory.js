import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';

const UpdateInventory = () => {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  const UpdateInventory = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/inventory/${id}`, {
      item: item,
      price: price,
      quantity: quantity,
      date: date
    })
    navigate("/inventory");
  }

  useEffect(() => {
    getInventoryById();
  }, []);

  const getInventoryById = async () => {
    const response = await axios.get(`http://localhost:5000/inventory/${id}`);
    setItem(response.data.item);
    setPrice(response.data.price);
    setQuantity(response.data.quantity);
    setDate(response.data.date);
  }

  return (
    <div className='container-AddInventory'>
      <form className='formInventory' onSubmit={UpdateInventory}>
        <label htmlFor="item" className='InventoryLabel'>Item</label> <br />
        <input className="InventoryInput" type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        <br /><br />

        <label htmlFor="price" className='InventoryLabel'>Price</label><br />
        <input className='InventoryInput' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br /><br />

        <label htmlFor="quantity" className='InventoryLabel'>Quantity</label> <br />
        <input className='InventoryInput' type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <br /><br />

        <label htmlFor="date" className='InventoryLabel'>Date</label><br />
        <input className='InventoryInput' type="Date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button className='submitInventory'>Update</button>
      </form>
    </div>
  )
}

export default UpdateInventory