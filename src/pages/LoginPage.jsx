import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth'; 
import Swal from 'sweetalert2';
import { FaStore, FaArrowLeft } from 'react-icons/fa'; // <-- FaArrowLeft ইম্পোর্ট করুন

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard'); 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Incorrect email or password.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* --- কার্ডটিকে relative করা হলো --- */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl relative"> 
        
        {/* --- নতুন: ব্যাক বাটন --- */}
        <Link 
          to="/" 
          className="absolute top-5 left-5 text-gray-400 hover:text-gray-700 transition"
          title="Back to Shop"
        >
          <FaArrowLeft size={20} />
        </Link>
        {/* --------------------- */}

        {/* লোগো এবং দোকানের নাম */}
        <div className="flex justify-center mb-6 pt-4"> {/* বাটন থেকে সরে আসার জন্য pt-4 */}
          <Link to="/" className="flex items-center gap-3">
            <FaStore className="text-4xl text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">
              আমার দোকান
            </span>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="tailwind-input"
              placeholder="admin@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="tailwind-input"
              placeholder="admin1234"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;