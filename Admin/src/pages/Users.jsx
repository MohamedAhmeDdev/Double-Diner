import React, { useEffect, useState } from "react";
import CustomersList from "../Components/users/Users";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";


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
    <div className="flex flex-col">
      <nav className="flex h-16 items-center mb-3 pl-4 lg:pl-6 border-b border-gray-100 bg-white" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li className="flex items-center">
                  <Link 
                    to="/" 
                    className="group flex items-center transition-all duration-200 hover:-translate-x-0.5"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 mr-2 transition-colors duration-200 shadow-sm">
                      <RiDashboardLine className="text-indigo-600 group-hover:text-indigo-700" size={16} />
                    </div>
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-300 mx-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600 ml-1 flex items-center">
                    <FiUsers className="mr-1.5 text-purple-500" size={16} />
                   users
                  </span>
                </li>
              </ol>
      </nav>
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