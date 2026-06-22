import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, 
  FiMapPin, FiPhone, FiUser, FiMail, FiArrowLeft, FiShoppingBag,
  FiCreditCard, FiCalendar, FiPrinter, FiShare2, FiMoreVertical,
  FiChevronRight, FiCheck, FiAlertCircle, FiMessageSquare
} from "react-icons/fi";

export const OrderProgressBar = ({ currentStatus }) => {
  const steps = [
    { id: "PENDING", label: "Order Placed", icon: FiClock },
    { id: "ACCEPTED", label: "Confirmed", icon: FiCheckCircle },
    { id: "READY_FOR_DELIVERY", label: "Prepared", icon: FiPackage },
    { id: "DELIVERED", label: "Delivered", icon: FiTruck },
    { id: "COMPLETED", label: "Completed", icon: FiCheck }
  ];

  if (currentStatus === "REJECTED") {
    return (
      <div className="bg-gradient-to-r from-rose-50 to-rose-100/50 border border-rose-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="p-3 bg-rose-100 rounded-full">
          <FiXCircle className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <h4 className="font-bold text-rose-800">Order Cancelled</h4>
          <p className="text-sm text-rose-600/80">This order was rejected and cannot be processed further.</p>
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex(step => step.id === currentStatus);
  const progress = currentIndex >= 0 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-600">Order Progress</h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="relative pt-2">
        {/* Progress Track - Full width bar */}
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators - Fixed positioning */}
        <div className="relative flex justify-between mt-0">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isActive = idx === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center" style={{ marginTop: '-14px' }}>
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-bold border-2 flex-shrink-0
                    ${isCompleted ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' :
                      isActive ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50' :
                      'bg-white border-slate-200 text-slate-400'
                    }`}
                >
                  {isCompleted ? <FiCheck className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs md:text-sm mt-2 whitespace-nowrap transition-colors text-center
                  ${isActive ? 'text-blue-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}
                `}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};