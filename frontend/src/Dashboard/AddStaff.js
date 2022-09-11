import React, { useState } from 'react'
import axios from "axios"
import '../css/AddStaff.css'
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
  const [fullName, setFullName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const staff = async (e) => {
    e.preventDefault();
    
    const formData = new FormData() 
    formData.append('fullName', fullName)
    formData.append('department', department)
    formData.append('idNo', idNo)
    formData.append('image',image)


    await axios.post('http://localhost:5000/staff',formData)
    navigate("/staff");
  }


  return (
    <div className='container-AddStaff'>
        <form className='formStaff' onSubmit={staff}  method="POST" encType='multipart/form-data'>
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
                         <input className="InputStaff" type="file"   onChange={(e) => setImage(e.target.files[0])}/>
                                  
                          <button type="submit" className='submitStaff'>ADD</button>
                          </form>
    </div>
  )
}

export default AddStaff