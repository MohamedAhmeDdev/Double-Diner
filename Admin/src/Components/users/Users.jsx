import React, { useState } from "react";
import { FiUser, FiMail, FiEye, FiTrash2, FiEdit, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import UpdateUser from "./UpdateUser";

const CustomersList = ({ listItems, onDelete, onUpdate, activeRole, setActiveRole , isLoading, setIsLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");


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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiCall(`/users/${selectedUser.id}`, "PATCH", { role });
      onUpdate(selectedUser.id, role);
      toast.success("User updated successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  // Filter users based on active tab
  const filteredUsers = listItems.filter(user => 
    activeRole === "admin" ? user.role === "admin" : user.role === "user"
  );


  return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
          {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Customer Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredUsers.length} {filteredUsers.length === 1 ? `${activeRole}` : `${activeRole}`} registered
              </p>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveRole("user")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeRole === "user"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveRole("admin")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeRole === "admin"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Admins
              </button>
            </nav>
          </div>

          {/* Customer List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center">
                      <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                            <FiUser className="text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 capitalize">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiMail className="mr-2 flex-shrink-0" size={14} />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openModal(user)}
                            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => onDelete(user.id)}
                            className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                <FiUser className="text-indigo-600" size={32} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No {activeRole === "admin" ? "admins" : "customers"} found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeRole === "admin" 
                  ? "There are currently no admin users." 
                  : "Get started by adding your first customer."}
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
                  Add {activeRole === "admin" ? "Admin" : "Customer"}
                </button>
              </div>
            </div>
          )}

          {/* Update User Modal */}
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

export default CustomersList;