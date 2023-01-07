import "../css/Dashboard.css";

import { GiMeal } from "react-icons/gi";
import { GrOrderedList } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <div className="logo-div">
        <h3 className="logo">Double Diner</h3>
      </div>
      <div className="container">
        <Link className="Link" to="/orders">
          <div className="container-div">
            <p className="icons">
              <GrOrderedList color="gold" size="2em" />
            </p>
            <p className="grid-name">Orders</p>
          </div>
        </Link>

        <Link className="Link" to="/customers">
          <div className="container-div">
            <p className="icons">
              <MdAccountCircle color="gold" size="2em" />
            </p>
            <p className="grid-name">Customers</p>
          </div>
        </Link>

        <Link className="Link" to="/inventory">
          <div className="container-div">
            <p className="icons">
              <GiMeal color="gold" size="2em" />
            </p>
            <p className="grid-name">Manage Inventory</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
