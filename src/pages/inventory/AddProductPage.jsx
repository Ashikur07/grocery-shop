import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import AddProductForm from '../../components/inventory/AddProductForm';

const AddProductPage = () => {
  const { categories } = useOutletContext();
  const navigate = useNavigate();

  // প্রোডাক্ট অ্যাড সফল হলে ইনভেন্টরি লিস্টে ফেরত যাবে
  const handleProductAdded = () => {
    navigate('/dashboard/inventory');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AddProductForm 
        categories={categories} 
        onProductAdded={handleProductAdded} 
      />
    </div>
  );
};

export default AddProductPage;