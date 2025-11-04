import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// --- FaStore (দোকান আইকন) ইম্পোর্ট করা হলো ---
import { FaShoppingCart, FaStore } from 'react-icons/fa';

const PublicNavbar = ({ cartItemCount }) => {
  const linkClass = "text-gray-600 hover:text-blue-600 py-2";
  const activeLinkClass = "text-blue-600 font-semibold py-2";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* --- আপডেট: আইকন পরিবর্তন করা হলো --- */}
        <Link to="/" className="flex items-center gap-3">
          <FaStore className="text-3xl text-blue-600" /> {/* <--- FaStore */}
          <span className="text-2xl font-bold text-gray-800">
            আমার দোকান
          </span>
        </Link>
        {/* ----------------------------------- */}
        
        {/* Middle Links (Dashboard সহ) */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : linkClass} end>
            Shop
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
            Dashboard
          </NavLink>
        </div>
        
        {/* Cart Button */}
        <div>
          <Link 
            to="/cart" 
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            <FaShoppingCart className="mr-2" />
            Cart
            {cartItemCount > 0 && (
              <span className="ml-2 bg-white text-blue-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;