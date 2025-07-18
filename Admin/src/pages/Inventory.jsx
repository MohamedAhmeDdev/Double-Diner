import React, { useEffect, useState } from "react";
import InventoryList from "../Components/inventory/InventoryList";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchInventoryItems = async () => {
    try {
      const response = await apiCall("/dishes", "GET");
      setInventoryItems(response.dishes);
    } catch (error) {
      toast.error("Failed to fetch inventory items");
    } finally {
      setIsLoading(false);
    }
  };

  fetchInventoryItems();
}, []);


  const handleDelete = (id) => {
    apiCall(`/dishes/${id}`, "DELETE").then((response) => {
      setInventoryItems((items) => items.filter((item) => item.id !== id));
    })(
      toast.success("Dish Deleted successfully")
    )
  };

  return (
    <div className="flex flex-col">
      <InventoryList listItems={inventoryItems} onDelete={handleDelete} isLoading={isLoading} />
    </div>
  );
};

export default Inventory;
