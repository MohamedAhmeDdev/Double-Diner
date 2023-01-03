import React, { useEffect, useState } from "react";

import CustomersList from "../Components/Customers/CustomersList";
import { apiCall } from "../apiCall";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const response = await apiCall("/users", "get");
    setCustomers(response.users);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <CustomersList listItems={customers} />
    </div>
  );
};

export default Customers;
