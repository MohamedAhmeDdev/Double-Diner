import React, { useState } from 'react'
import axios from "axios"
import '../css/AddStaff.css'

const AddStaff = () => {
  const [fullName, setFullName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [department, setDepartment] = useState('');
  const [picture, setPicture] = useState('');

  const staff = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/staff',{
      fullName: fullName,
      idNo: idNo,
      department: department,
      picture: picture
    })
  }


  return (
    <div className='container-AddStaff'>
        <form className='formStaff' onSubmit={staff}>
        <label htmlFor="fullName" className='labeStaff'>FullName</label> <br/>
          <input className="InputStaff" type="text" value={fullName}  onChange={(e) => setFullName(e.target.value)}/>         

          <br/>
              <label htmlFor="id no" className='id no'>Id No:</label><br/>
                <input className='InputStaff'  type="text" value={idNo}  onChange={(e) => setIdNo(e.target.value)}/>
                  <br/>

                  <label htmlFor="quantity"className='department'>Department</label> <br/>
                     <input className="InputStaff" type="text" value={department}  onChange={(e) => setDepartment(e.target.value)}/>
                       <br/>
                       <label htmlFor="picture" className='labeStaff'>Choose A picture</label>
                         <input className="InputStaff" type="file" value={picture}  onChange={(e) => setPicture(e.target.value)}/>
                                  
                          <button type="submit" className='submitStaff'>ADD</button>
                          </form>
    </div>
  )
}

export default AddStaff