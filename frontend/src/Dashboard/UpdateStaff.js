import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import '../css/AddStaff.css'

function UpdateStaff() {
  const [fullName, setFullName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const UpdateStaff = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/staff/${id}`, {
      fullName: fullName,
      idNo: idNo,
      department: department
    })
    navigate("/Staff");
  }

  const getStaffById = async () => {
    const response = await axios.get(`http://localhost:5000/staff/${id}`);
    setFullName(response.data.fullName);
    setIdNo(response.data.idNo);
    setDepartment(response.data.department);
  }

  useEffect(() => {
    getStaffById();
  }, []);

  return (
    <div className='container-AddStaff'>
      <form className='formStaff' onSubmit={UpdateStaff}>
        <label htmlFor="fullName" className='labeStaff'>FullName</label> <br />
        <input className="InputStaff" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <br />
        <label htmlFor="id no" className='id no'>Id No:</label><br />
        <input className='InputStaff' type="text" value={idNo} onChange={(e) => setIdNo(e.target.value)} />
        <br />

        <label htmlFor="quantity" className='department'>Department</label> <br />
        <input className="InputStaff" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />

        <button type="submit" className='submitStaff'>ADD</button>
      </form>
    </div>
  )
}

export default UpdateStaff