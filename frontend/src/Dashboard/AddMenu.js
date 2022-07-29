import React from 'react'
import '../css/AddMenu.css'

function AddMenu() {
  return (
    <div className='container-AddMenu'>
        <form className='formMenu'>
        <label htmlFor="item" className='menuLabel'>Picture</label> <br/>
          <input className="menuInputFile" type="file" />
            <br/><br/>

              <label htmlFor="price" className='menuLabel'>Price</label><br/>
                <input className='menuInput'  type="text"/>
                  <br/><br/>

                  <label htmlFor="quantity" className='menuLabel'>Food Name</label> <br/>
                     <input className='menuInput' type="text" />
                       <br/><br/>
                                      
                          <button className='submitMenu' type="submit">Add</button>
                          </form>
    </div>
  )
}

export default AddMenu