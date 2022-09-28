import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ImSpinner6 } from "react-icons/im";
import '../css/ListOfOrders.css'

function ListOfOrders() {
    const [orderList, setOrderList] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [loading, setLoading] = useState(false)


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
        }, 3000)
    }, [])


    return (
        <div className='container-OrderList'>
            <div>
                <div className='headerList-div'>
                    <p>Picture</p>
                    <p>FoodName</p>
                    <p>quantity</p>
                    <p>Price</p>
                </div>
                {loading ? <div className='loader'><ImSpinner6 size='4em'/></div> :
                    <>
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

                        {customerList.map((item, id) => (
                            <div className='customer-div' key={id}>
                                <div className='title-list'>
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
                                <div>
                                    <button className='cancel-order'>Cancel Order</button>
                                </div>
                            </div>
                        ))}
                    </>
                }

            </div>
        </div>
    )
}

export default ListOfOrders