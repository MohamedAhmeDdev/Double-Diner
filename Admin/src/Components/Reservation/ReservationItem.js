import React from 'react'
import { formatDate } from "../../utils/functions";


function ReservationItem({ data, onDelete}) {
    return (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-left"> <div className="text-sm text-gray-900">{data.fullName}</div></td>
          <td className="px-6 py-4 whitespace-nowrap text-left">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> {data.phone}</span> 
          </td>
          <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500">{data.tableFor}</td> 
          <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500">{formatDate(data.dateReserve)}</td> 
          <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500">{data.time}</td> 
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm  font-medium">
            <div className="flex flex-row space-x-4">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => onDelete(data.id)}>Delete</button>
            </div>
          </td>
        </tr>
      );
    };

export default ReservationItem