import React, {  useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/OrdersInfo.css'


const OrdersInfo = ({ cartItems }) => {
  let navigate = useNavigate()
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [errors, setErrors] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

  const createOrderWithDelivery = async (e) => {
    e.preventDefault();

    if (fullName.length === 0 || address.length === 0 || phone.length === 0 || location.length === 0) {
      setErrors("*")
    } else if (!regEx.test(address)) {
      setAddressError("*")
    } else if(
      await axios.post('http://localhost:5000/order', {
        //the info its going as an array
        order_info: {
          fullName: fullName,
          address: address,
          phone: phone,
          location: location,
          priceTotal: calcTotal(cartItems),
        },

        // mapping through the cart to select foodName, quantity & price
        items: cartItems.map(item => ({
          "image": item.image,
          "foodName": item.foodName,
          "quantity": item.quantity,
          "price": item.price * item.quantity
        }))
      })
    ){
      navigate("/ListOfOrders");

    }
  }

  function calcTotal(cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  }

  // it calculates the total price of each item
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0) // it adds the single price then it times it with the quantity 




  return (
    <>
      <div className='containerDiv'>

        <div className='container-cart'>
          <div className='header-div'>
            <p>Items</p>
            <p>quantity</p>
            <p>Price</p>
          </div>
          {cartItems.map((item, id) => (
            <div className='cartDiv' key={id}>
              <div className="orderCard">

                  <p className="cart cart-foodName">{item.foodName}</p>

                <p className="cart cart-quantity">{item.quantity}</p>

                <div className="cart cart-price">
                  <p className="">{item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
          <p className="cart-total">TOTAL : Ksh {totalPrice}</p>
        </div>

        <div className='container-orderInfo'>
          <form className='formOrder' onSubmit={createOrderWithDelivery}>
            <p className='formHead'>fill in the form if you order from outside the restaurant</p><br></br>
            <label htmlFor="item" className='orderLabel'>FullName <span className='spanError'>{errors && <p className='Error'>{errors}</p>}</span> </label> <br />
            <input className="OrderInput" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <br /><br />

            <label htmlFor="price" className='orderLabel'>Email Address <span className='spanError'>{errors && <p className='Error'>{errors}</p>}</span> <span className='spanError'>{addressError && <p className='Error'>{addressError}</p>}</span> </label><br />
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
    </>
  )

}

export default OrdersInfo