import CustomerListItem from "./CustomerListItem";
import React from "react";

const CustomersList = ({ listItems , onDelete }) => {
  //styled with Bulma
  return (
    <ul
      className="max-w-md divide-y divide-gray-200 dark:divide-gray-700
      px-4 py-4 sm:px-6 sm:py-6 lg:max-w-3xl lg:px-8 lg:py-8"
    >
      {listItems.map((user) => (
        <CustomerListItem key={user.name + user.id} customer={user} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default CustomersList;
