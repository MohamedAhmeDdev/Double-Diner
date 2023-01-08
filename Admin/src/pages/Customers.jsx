import React, { useEffect, useState } from "react";

import CustomersList from "../Components/Customers/CustomersList";
import { apiCall } from "../utils/apiCall";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const response = await apiCall("/users", "get");
    setCustomers(response.users);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleDelete = (id) => {
    apiCall(`/users/${id}`, "DELETE").then((response) => {
      setCustomers((items) => items.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <CustomersList listItems={customers} onDelete={handleDelete}/>
    </div>
  );
};

export default Customers;
