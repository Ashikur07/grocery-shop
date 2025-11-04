import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-12 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} আমার দোকান. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;