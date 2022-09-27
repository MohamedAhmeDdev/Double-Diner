import React from 'react'
import '../css/Dashboard.css'
import { BsGear, BsPeopleFill, BsTable, BsPlusSquareFill, BsMenuButtonWideFill } from "react-icons/bs";
import { GrOrderedList } from "react-icons/gr";
import { Link } from 'react-router-dom';


function Dashboard() {
    return (
        <div >
            <div className='logo-div'>
                <h3 className='logo'>Double Diner</h3>
            </div>
            <div className='container'>

                <Link className='Link' to='/Reservation'>
                    <div className='container-div'>
                        <p ><BsTable color='gold' size='2em' /></p>
                        <p className='grid-name'>Reservations</p>
                    </div>
                </Link>


                <Link className='Link' to='/AddInventory'>
                    <div className='container-div'>
                        <p className='icons'><BsPlusSquareFill color='gold' size='2em' /></p>
                        <p className='grid-name'>Add Inventory</p>
                    </div>
                </Link>

                <Link className='Link' to='/AddStaff'>
                    <div className='container-div'>
                        <p className='icons'><BsPeopleFill color='gold' size='2em' /></p>
                        <p className='grid-name'>Add Staff</p>
                    </div>
                </Link>

                <Link className='Link' to='/AddMenu' >
                    <div className='container-div'>
                        <p className='icons'><BsMenuButtonWideFill color='gold' size='2em' /></p>
                        <p className='grid-name'>Add Menu</p>
                    </div>
                </Link>

                <Link className='Link' to='/CustomersOrders' >
                    <div className='container-div'>
                        <p className='icons'><GrOrderedList color='gold' size='2em' /></p>
                        <p className='grid-name'>Customers Orders</p>
                    </div>
                </Link>

                <div className='container-div'>
                    <p className='icons'><BsGear color='gold' size='2em' /></p>
                    <p className='grid-name'>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard