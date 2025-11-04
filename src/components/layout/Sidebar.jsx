import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'; // <-- useNavigate ইম্পোর্ট
import { 
  FaTachometerAlt, FaInbox, FaChevronDown, FaChevronRight,
  FaListAlt, FaPlusCircle, FaStore,
  FaSignOutAlt // <-- লগআউট আইকন
} from 'react-icons/fa';
import { logout } from '../../utils/auth'; // <-- logout ফাংশন ইম্পোর্ট

const Sidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // <-- useNavigate হুক

  React.useEffect(() => {
    if (location.pathname.startsWith('/dashboard/inventory')) {
      setIsInventoryOpen(true);
    }
  }, [location.pathname]);

  const linkClass = "flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700";
  const activeLinkClass = "flex items-center p-3 rounded-lg bg-blue-600 text-white";
  const subLinkClass = "flex items-center p-3 pl-10 rounded-lg text-gray-300 hover:bg-gray-700";
  const activeSubLinkClass = "flex items-center p-3 pl-10 rounded-lg bg-gray-700 text-white";

  const toggleInventory = (e) => {
    e.preventDefault();
    setIsInventoryOpen(!isInventoryOpen);
  };

  // --- নতুন: লগআউট হ্যান্ডলার ---
  const handleLogout = () => {
    logout();
    navigate('/login'); // লগইন পেজে ফেরত পাঠান
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-10">Admin Panel</div>
      
      <nav className="flex flex-col space-y-2 flex-grow">
        {/* ... (ড্যাশবোর্ড এবং ইনভেন্টরি লিঙ্ক অপরিবর্তিত) ... */}
         <NavLink 
          to="/dashboard"
          end 
          className={({ isActive }) => isActive ? activeLinkClass : linkClass}
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>
        <button
          onClick={toggleInventory}
          className={`${linkClass} w-full flex justify-between items-center`}
        >
          <div className="flex items-center">
            <FaInbox className="mr-3" />
            <span>Inventory</span>
          </div>
          {isInventoryOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
        </button>
        {isInventoryOpen && (
          <div className="flex flex-col space-y-1 mt-1 pl-4">
            <NavLink
              to="/dashboard/inventory"
              end
              className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}
            >
              <FaListAlt className="mr-3" />
              Current Inventory
            </NavLink>
            <NavLink
              to="/dashboard/inventory/add"
              className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}
            >
              <FaPlusCircle className="mr-3" />
              Add New Product
            </NavLink>
          </div>
        )}
      </nav>

      <div className="mt-auto">
        <hr className="my-3 border-gray-700" /> 
        <Link 
          to="/"
          className={linkClass}
        >
          <FaStore className="mr-3" />
          View Shop
        </Link>
        
        {/* --- নতুন: লগআউট বাটন --- */}
        <button
          onClick={handleLogout}
          className={`${linkClass} w-full`}
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;