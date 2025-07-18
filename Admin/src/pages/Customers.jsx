import React, { useEffect, useState } from "react";
import CustomersList from "../Components/Customers/CustomersList";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";

const Customers = () => {
  const [activeRole, setActiveRole] = useState("user");
 const [users, setUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
       const response = await apiCall(`/users?role=${activeRole}`, "GET");
     setUsers(response.users);
    } catch (error) {
      toast.error("Failed to fetch customers");
      console.error("Fetch customers error:", error);
    } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    getUser();
 }, [activeRole]);

  const updateUser = async (id, newRole) => {
    try {
      await apiCall(`/users/${id}`, "PATCH", { role: newRole });
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
      console.error("Update user error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiCall(`/users/${id}`, "DELETE");
      setUsers(users.filter(user => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
      console.error("Delete user error:", error);
    }
  };

  return (
    <div>
      <CustomersList 
        listItems={users} 
        onDelete={handleDelete} 
        onUpdate={updateUser} 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Customers;