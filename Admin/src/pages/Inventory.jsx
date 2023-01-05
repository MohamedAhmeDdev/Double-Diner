import React, { useEffect, useState } from "react";

import InventoryList from "../Components/inventory/InventoryList";
import { apiCall } from "../utils/apiCall";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    apiCall("/dishes", "GET").then((response) => {
      setInventoryItems(response.dishes);
    });
  }, []);

  const handleDelete = (id) => {
    apiCall(`/dishes/${id}`, "DELETE").then((response) => {
      setInventoryItems((items) => items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="flex flex-col">
      <InventoryList listItems={inventoryItems} onDelete={handleDelete} />
    </div>
  );
};

export default Inventory;
