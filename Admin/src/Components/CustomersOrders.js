import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/CustomersOrders.css'
import { Link } from 'react-router-dom'

function CustomersOrders() {
    const [orderList, setOrderList] = useState([])
    const [customerList, setCustomerList] = useState([])


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

    return (
        <div className='container-OrderList'>
            <div className='container-flex'>
                <div>
                    {orderList.map((item, id) => (
                        <div className='ListDiv' key={id}>
                            <div className="listCard">
                                <p className="list-image"><img src={`http://localhost:5000/${item.image}`} width="50px" height="50px" alt="" /></p>

                                <p className="list-foodName">{item.foodName}</p>

                                <p className="list-quantity">{item.quantity}</p>

                                <p className="list-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    {customerList.map((item, id) => (
                        <div className='customer-div' key={id}>
                            <div className='title-list'>
                                <div className='container-info'>

                                    <div className='info-div'>
                                        <div className='titles'>
                                            <p>fullName:</p>
                                            <p>Email Address:</p>
                                            <p>Phone:</p>
                                            <p>Location:</p>
                                            <p>Status:</p>
                                            <p>Total:</p>
                                        </div>
                                        <div className='list'>
                                            <p className="list-total">{item.fullName}</p>
                                            <p className="list-total">{item.address}</p>
                                            <p className="list-total">{item.phone}</p>
                                            <p className="list-total">{item.location}</p>
                                            <p className="list-total">{item.status}</p>
                                            <p className="list-total">TOTAL : Ksh {item.priceTotal}</p>
                                        </div>
                                    </div>

                                    <div className='select-div'>
                                        <Link to={`/updateStatus/${item.id}`}  ><button className='change-button'>Change</button> </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default CustomersOrders


