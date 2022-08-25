import React, { useState } from 'react'
import axios from "axios"
import '../css/AddInventory.css'

const AddInventory = () => {
  const[item, setItem] = useState('')
  const[price, setPrice] = useState('')
  const[quantity, setQuantity] = useState('')
  const[date, setDate] = useState('')

  const AddInventory = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/inventory',{
      item: item,
      price: price,
      quantity: quantity,
      date: date
    })
  }

  return (
    <div className='container-AddInventory'>
      <form className='formInventory' onSubmit={AddInventory}>
        <label htmlFor="item" className='InventoryLabel'>Item</label> <br/>
          <input className="InventoryInput" type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
            <br/><br/>

              <label htmlFor="price" className='InventoryLabel'>Price</label><br/>
                <input className='InventoryInput'  type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                  <br/><br/>

                  <label htmlFor="quantity" className='InventoryLabel'>Quantity</label> <br/>
                     <input className='InventoryInput' type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                       <br/><br/>
                  
                    <label htmlFor="date" className='InventoryLabel'>Date</label><br/>
                      <input className='InventoryInput' type="Date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    
                          <button className='submitInventory' type="submit">Add</button>
                          </form>
                        </div>
                          )
}

                          export default AddInventory