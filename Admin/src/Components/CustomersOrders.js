import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CustomersOrders.css";
import { Link } from "react-router-dom";

function CustomersOrders() {
  const [orderList, setOrderList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  const getOrderList = async () => {
    const orderList = await axios.get("http://localhost:5000/orderItems");
    setOrderList(orderList.data);
  };

  const getCustomerList = async () => {
    const customerInfo = await axios.get("http://localhost:5000/order");
    setCustomerList(customerInfo.data);
  };

  useEffect(() => {
    getOrderList();
  }, [orderList]);

  useEffect(() => {
    getCustomerList();
  }, [customerList]);

  return (
    <div className="container-OrderList-table">
      <table className="customer-table">
        <thead>
          <tr>
            <th>FullName</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Food</th>
            <th>Status</th>
            <th>Total</th>
            <th>Change</th>
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
              <td>
                <Link to={`/updateStatus/${item.id}`}> <button className="change-button">Change</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersOrders;
