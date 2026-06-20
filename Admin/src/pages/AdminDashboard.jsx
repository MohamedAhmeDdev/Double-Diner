import React from "react";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { FiUsers, FiPieChart, FiSettings } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import { UseAuthContext } from "../hook/UseAuthContext";

const AdminDashboard = () => {
  const { user } = UseAuthContext();

  const dashboardItems = [
    {
      title: "Orders",
      icon: <GiShoppingCart className="text-black group-hover:text-white transition-colors duration-300" size={24} />,
      path: "/orders",
    },
    {
      title: "Users",
      icon: <FiUsers className="text-black group-hover:text-white transition-colors duration-300" size={24} />,
      path: "/users",
    },
    {
      title: "Inventory",
      icon: <MdOutlineInventory className="text-black group-hover:text-white transition-colors duration-300" size={24} />,
      path: "/inventory",
    },
    {
      title: "Sales Reports",
      icon: <FiPieChart className="text-black group-hover:text-white transition-colors duration-300" size={24} />,
      path: "/dishReport",
    },
    {
      title: "Profile Settings",
      icon: <FiSettings className="text-black group-hover:text-white transition-colors duration-300" size={24} />,
      path: user?.id ? `/update-profile/${user.id}` : "/update-profile",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
      
      {/* Settings Dashboard Header */}
      <header className="border-b border-gray-200 pb-6 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
            Admin Dashboard
          </h1>
          <p className="text-sm text-black mt-1">
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-12">
        {/* Welcome Banner (Inverted High Contrast Minimalist Grid Container) */}
        <div className="bg-black rounded-lg p-8 text-white flex flex-col justify-between items-start shadow-sm">
          <div>
            <h2 className="text-lg font-bold tracking-tight uppercase mb-2">
              Restaurant Overview
            </h2>
            <p className="text-sm text-white font-light max-w-xl leading-relaxed">
              Manage your day-to-day restaurant operations, check inventory quantities, run analytical sales charts, and maintain user access keys.
            </p>
          </div>
        </div>

        {/* Section Title */}
        <div className="border-b border-gray-200 pb-2">
          <h3 className="text-xs font-semibold tracking-wider text-black uppercase">
            Management Console
          </h3>
        </div>

        {/* Dashboard Cards Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {dashboardItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="group relative block border border-gray-200 rounded-xl bg-white p-6 transition-all duration-300 hover:bg-black hover:border-black hover:shadow-md"
            >
              <div className="flex flex-col h-full justify-between space-y-6">
                {/* Icon Container Frame */}
                <div className="flex items-center justify-center h-12 w-12 border border-gray-200 rounded-lg bg-gray-50 group-hover:bg-black group-hover:border-white transition-colors duration-300">
                  {item.icon}
                </div>
                
                {/* Text Content Area */}
                <div>
                  <h4 className="text-base font-semibold tracking-tight text-black group-hover:text-white transition-colors duration-300 uppercase">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-gray-100 group-hover:border-zinc-800 transition-colors duration-300">
                    <span className="text-xs text-black group-hover:text-white font-medium tracking-wide transition-colors duration-300">
                      Manage Entry
                    </span>
                    <span className="text-sm transform translate-x-0 text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;