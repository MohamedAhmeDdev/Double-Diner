import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ImSpinner6 } from "react-icons/im";
import '../css/ListOfOrders.css'

function ListOfOrders() {
    const [orderList, setOrderList] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)


    const getOrderList = async () => {
        const orderList = await axios.get('http://localhost:5000/orderItems')
        setOrderList(orderList.data)
    }

    const getCustomerList = async () => {
        const customerInfo = await axios.get('http://localhost:5000/order')
        setCustomerList(customerInfo.data)
    }

    useEffect(() => {
        getOrderList();
    }, [orderList]);

    useEffect(() => {
        getCustomerList();
    }, [customerList]);


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])

    useEffect(() => {
        setMessage("The Order IS Being Prossed")
        setTimeout(() => {
            setMessage(false)
        }, 3000)
    }, [])



    return (
        <div className='container-OrderList'>
            <div>
            {message && <p className='message-div'>{message}</p>}

            <table className="ListOrders-table">
        <thead>
          <tr>
            <th>FullName</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Food</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((item, id) => (
            <tr key={id}>
              <td>{item.fullName}</td>
              <td>{item.phone}</td>
              <td>{item.location}</td>

              <td>
              {orderList.map((item, id) => (
                <>
                 {item.foodName},
                </>
              ))}
              </td>

              <td>{item.status}</td>
              <td>Ksh {item.priceTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
        </div>
    )
}

export default ListOfOrders