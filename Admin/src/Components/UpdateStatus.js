import React, { useEffect, useState } from 'react'
import '../css/CustomersOrders.css'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';


function UpdateStatus() {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [priceTotal, setPriceTotal] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const getStatusById = async () => {
        const response = await axios.get(`http://localhost:5000/order/${id}`);
        setFullName(response.data.fullName);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setStatus(response.data.status);
        setLocation(response.data.location);
        setPriceTotal(response.data.priceTotal);
      }
    
      useEffect(() => {
        getStatusById();
      }, []);


    return (
        <div className='container-OrderList'>
            <div className='container-flex'>
                <div>
                    <div className='customer-div'>
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
                                        <p className="list-total">{fullName}</p>
                                        <p className="list-total">{address}</p>
                                        <p className="list-total">{phone}</p>
                                        <p className="list-total">{location}</p>
                                        <p className="list-total">{status}</p>
                                        <p className="list-total">TOTAL : Ksh {priceTotal}</p>
                                    </div>
                                </div>

                                <div className='select-div'>
                                    <form >
                                        <select className='select-input'>
                                            <option>Status</option>
                                            <option>Decline</option>
                                            <option>Accept</option>
                                            <option>Complete</option>
                                        </select>
                                        <button className='change-button'>Change</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateStatus