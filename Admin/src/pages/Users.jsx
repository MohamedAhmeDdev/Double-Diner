import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiTrash2, FiEdit, FiPhone, FiHome, FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiCall } from "../utils/apiCall";
import UpdateUser from "../Components/UpdateUser";

const Customers = () => {
  const [activeRole, setActiveRole] = useState("user");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  // Fetch users
  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/users?role=${activeRole}`, "GET");
      setUsers(response.users);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [activeRole]);

  // Update user
  const updateUser = async (id, newRole) => {
    try {
      await apiCall(`/users/${id}`, "PATCH", { role: newRole });
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await apiCall(`/users/${id}`, "DELETE");
      setUsers(users.filter(user => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Modal handlers
  const openModal = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setRole("");
  };

  // Handle update from modal
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiCall(`/users/${selectedUser.id}`, "PATCH", { role });
      updateUser(selectedUser.id, role);
      closeModal();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  // Filter users based on active tab
  const filteredUsers = users.filter(user => 
    activeRole === "admin" ? user.role === "admin" : user.role === "user"
  );

  // Skeleton row component (Monochrome)
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 border border-gray-200"></div>
          <div className="ml-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-end space-x-2">
          <div className="h-8 w-8 bg-gray-100 rounded-lg border border-gray-200"></div>
          <div className="h-8 w-8 bg-gray-100 rounded-lg border border-gray-200"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 mx-auto">
      <div className="w-full mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-md md:text-2xl font-bold tracking-tight text-gray-900 uppercase">
              Customer Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all registered customers and administrators in the system. Use the tabs to switch between user roles and perform actions such as editing or deleting accounts.
            </p>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveRole("user")}
              className={`pb-4 px-1 border-b-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeRole === "user"
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-black hover:border-gray-200"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveRole("admin")}
              className={`pb-4 px-1 border-b-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeRole === "admin"
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-black hover:border-gray-200"
              }`}
            >
              Admins
            </button>
          </nav>
        </div>

        {/* Customer List Table */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  City
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} />
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <FiUser className="text-black" size={16} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 uppercase tracking-tight">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600 font-medium">
                        <FiMail className="mr-2 text-gray-400 flex-shrink-0" size={14} />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="mr-2 text-gray-400 flex-shrink-0" size={14} />
                        <span>{user.phone || user.phoneNumber || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMapPin className="mr-2 text-gray-400 flex-shrink-0" size={14} />
                        <span>{user.city || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiHome className="mr-2 text-gray-400 flex-shrink-0" size={14} />
                        <span>{user.address || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase font-mono tracking-wide">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal(user)}
                          className="text-black hover:text-white p-2 border border-gray-200 hover:border-black hover:bg-black rounded-lg transition-all"
                          title="Edit"
                        >
                          <FiEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-white p-2 border border-gray-200 hover:border-red-600 hover:bg-red-600 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                      <FiUser className="text-gray-400" size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      No {activeRole === "admin" ? "admins" : "customers"} found
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 max-w-xs mx-auto">
                      {activeRole === "admin" 
                        ? "There are currently no administrator accounts configured." 
                        : "No user registrations match the standard customer parameter arrays."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update User Modal Instance Viewport context */}
        {isModalOpen && selectedUser && (
          <UpdateUser
            closeModal={closeModal}
            selectedUser={selectedUser}
            role={role}
            setRole={setRole}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Customers;