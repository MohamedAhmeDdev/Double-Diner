import React from 'react'
import '../css/AddInventory.css'

function AddInventory() {
  return (
    <div className='container-AddInventory'>
      <form className='formInventory'>
        <label htmlFor="item" className='InventoryLabel'>Item</label> <br/>
          <input className="InventoryInput" type="text" />
            <br/><br/>

              <label htmlFor="price" className='InventoryLabel'>Price</label><br/>
                <input className='InventoryInput'  type="text"/>
                  <br/><br/>

                  <label htmlFor="quantity" className='InventoryLabel'>Quantity</label> <br/>
                     <input className='InventoryInput' type="text" />
                       <br/><br/>
                  
                    <label htmlFor="date" className='InventoryLabel'>Date</label><br/>
                      <input className='InventoryInput' type="Date"/>
                    
                          <button className='submitInventory' type="submit">Add</button>
                          </form>
                        </div>
                          )
}

                          export default AddInventory