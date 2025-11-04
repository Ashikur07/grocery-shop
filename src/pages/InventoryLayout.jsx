import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const InventoryLayout = () => {
  const { data: categories, loading } = useFetch('/categories');

  if (loading) {
    return <div className="p-8">Loading Categories...</div>;
  }

  // --- বাটন স্টাইল আপডেট করা হয়েছে ---
  // বেস স্টাইল (উভয় বাটনের জন্য)
  const baseLinkClass = "px-5 py-2 rounded-lg font-semibold transition duration-200 text-center";
  // অ্যাক্টিভ (সলিড ব্লু)
  const activeLinkClass = "bg-blue-600 text-white shadow-lg";
  // ইন-অ্যাক্টিভ (সাদা, বর্ডার সহ)
  const inactiveLinkClass = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100";
  // ---------------------------------

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        
        {/* --- বাটন গ্রুপ (আপডেট করা) --- */}
        <div className="flex space-x-3">
          <NavLink
            to="/dashboard/inventory"
            end
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            Current Inventory
          </NavLink>
          <NavLink
            to="/dashboard/inventory/add"
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            Add New Product
          </NavLink>
        </div>
        {/* ------------------------- */}

      </div>
      
      {/* Outlet অপরিবর্তিত */}
      <Outlet context={{ categories }} />
    </div>
  );
};

export default InventoryLayout;