import { GiMeal, GiShoppingCart } from "react-icons/gi";
import { FiUsers, FiPieChart, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Orders",
      icon: <GiShoppingCart className="text-white" size={24} />,
      path: "/orders",
      bgColor: "bg-gradient-to-br from-green-300 to-green-600",
      hoverColor: "hover:shadow-lg hover:scale-[1.02]"
    },
    {
      title: "Customers",
      icon: <FiUsers className="text-white" size={24} />,
      path: "/customers",
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>
          <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
            Double Diner Restaurant
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Restaurant Overview</h2>
          <p className="opacity-90">Manage your restaurant operations efficiently</p>
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

        {/* Recent Activity Section */}
    
      </main>
    </div>
  );
};

export default AdminDashboard;