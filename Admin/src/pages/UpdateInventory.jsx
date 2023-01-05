import React, { useEffect, useState } from "react";

import UpdateItemForm from "../Components/inventory/UpdateItemForm";
import { apiCall } from "../utils/apiCall";
import { useParams } from "react-router-dom";

const UpdateInventory = () => {
  const { id } = useParams();

  const [item, setItem] = useState({});

  useEffect(() => {
    apiCall(`/dishes/${id}`, "GET").then((res) => {
      setItem(res.dish);
    });
  }, [id]);

  return (
    <div>
      <UpdateItemForm item={item} />
    </div>
  );
};

export default UpdateInventory;
