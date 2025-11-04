import React, { useEffect } from 'react';
import AOS from 'aos';
import { Routes, Route } from 'react-router-dom';

// Public পেজ ও লেআউট
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage'; 

// --- নতুন: লগইন পেজ ইম্পোর্ট ---
import LoginPage from './pages/LoginPage';

// Admin পেজ ও লেআউট
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import InventoryLayout from './pages/InventoryLayout'; 
import ProductListPage from './pages/inventory/ProductListPage'; 
import AddProductPage from './pages/inventory/AddProductPage'; 
import EditProductPage from './pages/inventory/EditProductPage'; 

// --- নতুন: প্রটেক্টেড রুট ইম্পোর্ট ---
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: false, // অ্যানিমেশন বারবার হবে
      easing: 'ease-in-out',
    });
  }, []); 

  return (
    <Routes>
      {/* --- ১. Public রুট --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* --- ২. আলাদা লগইন রুট (এর কোনো লেআউট নেই) --- */}
      <Route path="/login" element={<LoginPage />} />

      {/* --- ৩. Admin রুট (এখন সুরক্ষিত) --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<InventoryLayout />}>
            <Route index element={<ProductListPage />} /> 
            <Route path="add" element={<AddProductPage />} /> 
            <Route path="edit/:id" element={<EditProductPage />} /> 
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;