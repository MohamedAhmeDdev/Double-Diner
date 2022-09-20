import React, { useState } from 'react'
import axios from "axios";
import '../css/OrdersInfo.css'


const OrdersInfo = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [errors, setErrors] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

  const customerInfo = async (e) => {
    e.preventDefault();

    if (fullName.length === 0 || address.length === 0 || phone.length === 0 || location.length === 0) {
      setErrors("*")
    } else if (!regEx.test(address)) {
      setAddressError("*")
    } else (
      await axios.post('http://localhost:5000/order', {
        fullName: fullName,
        address: address,
        phone: phone,
        location: location,
        tableNo: tableNo
      })
    )

  }


  const tableInfo = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/order', {
      fullName: fullName,
      address: address,
      phone: phone,
      location: location,
      tableNo: tableNo
    })
  }



  return (
    <>
      <p className='headOrder'>Please fill The Input below  </p>
      <div>
        <div className='container-orderInfo'>
          <form className='formOrder' onSubmit={customerInfo}>
            <p className='formHead'>fill in the form if you order from outside the restaurant</p><br></br>
            <label htmlFor="item" className='orderLabel'>FullName <span className='spanError'>{errors && <p className='Error'>{errors}</p>}</span> </label> <br />
            <input className="OrderInput" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <br /><br />

            <label htmlFor="price" className='orderLabel'>Address <span className='spanError'>{errors && <p className='Error'>{errors}</p>}</span> <span className='spanError'>{addressError && <p className='Error'>{addressError}</p>}</span> </label><br />
            <input className='OrderInput' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br /><br />

            <label htmlFor="date" className='orderLabel'>phone <span className='spanError'>{errors && <p className='Error'>{errors}</p>} </span> </label><br />
            <input className='OrderInput' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br /><br />

            <label htmlFor="quantity" className='orderLabel'>Location <span className='spanError'>{errors && <p className='Error'>{errors}</p>} </span> </label> <br />
            <input className='OrderInput' type="text" value={location} onChange={(e) => setLocation(e.target.value)} />


            <button className='submitOrder' type="submit">Submit</button>
          </form>
        </div>
      </div>

      <p className='or'>OR</p>

      <div>
        <div className='container-tableInfo'>
          <form className='formTableOrder' onSubmit={tableInfo}>
            <p className='formHead'>fill in the form if you within the restaurant restaurant</p><br></br>
            <label htmlFor="item" className='orderLabel'>Table No</label> <br />
            <input className="OrderInput" type="text" value={tableNo} onChange={(e) => setTableNo(e.target.value)} />
            <button className='submitOrder' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default OrdersInfo