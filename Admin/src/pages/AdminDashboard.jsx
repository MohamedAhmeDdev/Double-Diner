import { GiMeal, GiShoppingCart } from "react-icons/gi";
import { FiUsers, FiPieChart, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { UseAuthContext } from "../hook/UseAuthContext";

const AdminDashboard = () => {
    const { user } = UseAuthContext();

  const dashboardItems = [
    {
      title: "Orders",
      icon: <GiShoppingCart className="text-white" size={24} />,
      path: "/orders",
      bgColor: "bg-gradient-to-br from-green-300 to-green-600",
      hoverColor: "hover:shadow-lg hover:scale-[1.02]"
    },
    {
      title: "Users",
      icon: <FiUsers className="text-white" size={24} />,
      path: "/users",
      bgColor: "bg-gradient-to-br from-purple-300 to-purple-600",
      hoverColor: "hover:shadow-lg hover:scale-[1.02]"
    },
    {
      title: "Inventory",
      icon: <MdOutlineInventory className="text-white" size={24} />,
      path: "/inventory",
      bgColor: "bg-gradient-to-br from-orange-300 to-orange-600",
      hoverColor: "hover:shadow-lg hover:scale-[1.02]"
    },
    {
      title: "Sales Reports",
      icon: <FiPieChart className="text-white" size={24} />,
      path: "/dishReport",
      bgColor: "bg-gradient-to-br from-red-300 to-red-600",
      hoverColor: "hover:shadow-lg hover:scale-[1.02]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <RiDashboardLine className="text-indigo-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>
           <div className="flex items-center space-x-4">
             <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
              <p> Double Diner Restaurant</p>
            </div>
            <Link to={`/UpdateProfile/${user.id}`}>
            <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-indigo-50 text-[#181111] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div class="text-indigo-600" data-icon="User" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
            </button>
          </Link>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Restaurant Overview</h2>
          <p className="opacity-90">
            Manage your restaurant operations efficiently
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dashboardItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${item.bgColor} ${item.hoverColor} rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl`}
            >
              <div className="p-6 flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-center text-white">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm mt-1">View details</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;