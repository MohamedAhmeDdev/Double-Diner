import React, { useEffect, useState } from "react";
import ReservationList from "../Components/Reservation/ReservationList";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";


function Reservation({}) {
    const [reservation, setReservation] = useState([]);


    const getReservation = async () => {
      const response = await apiCall("/reservation", "get");
      setReservation(response.reservation);
    };
  
    useEffect(() => {
      getReservation();
    }, []);

    const handleDelete = (id) => {
      apiCall(`/reservation/${id}`, "DELETE").then((response) => {
        setReservation((items) => items.filter((item) => item.id !== id));
      })(
        toast.success("Reservation Deleted successfully")
      )
    };
  
    
  return (
    <div>
      <ReservationList listItems={reservation} onDelete={handleDelete}/>
    </div>
  )
}

export default Reservation