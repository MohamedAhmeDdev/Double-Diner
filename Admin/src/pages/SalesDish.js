import React, { useEffect, useState } from "react";
import DishItem from "../Components/Report/DishItem";
import { apiCall } from "../utils/apiCall";

function SalesDish() {
    const [dishReport, setDishReport] = useState([]);


    const getDishReport = async () => {
        const response = await apiCall("/report/dish", "get");
        setDishReport(response.dishReport);
      };
    
      useEffect(() => {
        getDishReport();
      }, []);

      
  return (
    <div>
        <DishItem listItem={dishReport} />
    </div>
  )
}

export default SalesDish