import React, { useEffect, useState } from "react";

import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const DishView = () => {
  const [dish, setDish] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getDish = async () => {
      const res = await axios.get(`${SERVER_URL}/dishes/${id}`);

      if (res.status === 200) {
        setDish(res.data.dish);
      }
    };

    getDish();
  }, [id]);

  // You have access to the dish here design the UI
  console.log(dish);

  return (
    <div className="mt-32">
      <p className="text-4xl font-bold text-center">
        Dish View Page for <span className="text-green-500">{dish?.name}</span>
      </p>
      <br />
      <p className="text-2xl font-bold text-center text-gray-600">
        You have access to the dish here design the UI
      </p>
    </div>
  );
};

export default DishView;
