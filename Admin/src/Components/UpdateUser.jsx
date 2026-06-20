import React from 'react';

function UpdateUser({ closeModal, selectedUser, role, setRole, handleUpdate }) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={closeModal}></div>
        </div>

        {/* Trick to center modal contents vertically */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel Box */}
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden border border-gray-200 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white p-6 sm:p-8">
            
            {/* Header Area */}
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                Modify Access Level
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Adjust permissions matrices for verified users.
              </p>
            </div>

            {/* Input Action Fields */}
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm font-semibold text-gray-500 uppercase tracking-tight font-sans cursor-not-allowed focus:outline-none"
                  id="name"
                  type="text"
                  value={selectedUser?.name || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-500 font-mono cursor-not-allowed focus:outline-none"
                  id="email"
                  type="email"
                  value={selectedUser?.email || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2" htmlFor="role">
                  Assigned Role
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-3 text-sm font-semibold text-black uppercase tracking-wide transition-colors appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* Custom Chevron Indicator */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Functional Controls Footer */}
              <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-neutral-800 border border-transparent text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;