import React from "react";

const UpdateItemForm = ({ item }) => {
  const { id, name, price, category, quantity, image } = item;

  console.log(item);

  return (
    <div>
      <h1>Update Item Form</h1>
      <p>
        Based on the create item form, create a form that will allow the admin
        to update an item. The form should be pre-populated with the current
        item information, gotten from an apiCall to fetch data about the item.
      </p>
    </div>
  );
};

export default UpdateItemForm;
