import React from 'react'
import '../css/AddStaff.css'

function AddStaff() {
  return (
    <div className='container-AddStaff'>
        <form className='formStaff'>
        <label htmlFor="fullName" className='labeStaff'>FullName</label> <br/>
          <input className="InputStaff" type="text" />         

          <br/>
              <label htmlFor="id no" className='id no'>Id No:</label><br/>
                <input className='InputStaff'  type="text"/>
                  <br/>

                  <label htmlFor="quantity"className='department'>Department</label> <br/>
                     <input className="InputStaff" type="text" />
                       <br/>
                       <label htmlFor="picture" className='labeStaff'>Choose A picture</label>
                         <input className="InputStaff" type="file" />
                                  
                          <button type="submit" className='submitStaff'>ADD</button>
                          </form>
    </div>
  )
}

export default AddStaff