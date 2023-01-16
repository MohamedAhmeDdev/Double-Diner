import React from 'react'
import ReservationItem from './ReservationItem'

function ReservationList({listItems ,onDelete}) {
  return (
    <div className="flex flex-col  space-y-4 p-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table_For</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date_Reserved</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Action </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {listItems?.map((item) => (
                  <ReservationItem
                    data={item}
                    key={item.id}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationList