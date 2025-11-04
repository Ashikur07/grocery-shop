import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSearchChange }) => {
  return (
    // সার্চবারের নিচে একটু বেশি গ্যাপ দেওয়া হলো
    <div className="mb-10">
      <div className="relative">
        
        {/* সার্চ আইকন (ইনপুটের ভেতরে) */}
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        
        {/* ইনপুট ফিল্ড (ডিজাইন আপডেট করা হয়েছে) */}
        <input
          type="text"
          placeholder="Search for products by name or brand..."
          className="
            w-full 
            pl-14 pr-5 py-4    /* আইকনের জন্য বামে প্যাডিং বাড়ানো হয়েছে */
            text-lg 
            text-gray-700
            bg-white
            border border-gray-200  /* হালকা বর্ডার */
            rounded-lg 
            shadow-sm 
            placeholder-gray-400 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:shadow-md        /* ফোকাস শ্যাডো */
            transition duration-200
          "
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Searchbar;