import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProductPage = () => {
  const { categories } = useOutletContext();
  const { id } = useParams(); // URL থেকে প্রোডাক্ট ID পাওয়া
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. নির্দিষ্ট প্রোডাক্টের ডেটা ফেচ করা
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  // ২. ফর্ম সাবমিট (PUT রিকোয়েস্ট)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updatedProduct = {
      name: form.name.value,
      brand: form.brand.value,
      image: form.image.value,
      categoryId: form.category.value,
      purchasePrice: parseFloat(form.purchasePrice.value),
      sellingPrice: parseFloat(form.sellingPrice.value),
      quantityInStock: parseInt(form.quantity.value),
      unit: form.unit.value
    };

    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Product has been updated.', 'success');
        navigate('/dashboard/inventory'); // লিস্টে ফেরত যাওয়া
      } else {
        Swal.fire('Error', 'Could not update product.', 'error');
      }
    });
  };
  
  if (loading) return <p>Loading product data...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product: {product.name}</h2>
      {/* ফর্মটি AddProductForm-এর মতোই, শুধু defaultValue যোগ করা হয়েছে */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input type="text" name="name" id="name" defaultValue={product.name} required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input type="text" name="brand" id="brand" defaultValue={product.brand} className="tailwind-input" />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" name="image" id="image" defaultValue={product.image} placeholder="https://..." className="tailwind-input" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select name="category" id="category" defaultValue={product.categoryId} required className="tailwind-input">
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price (৳) *</label>
            <input type="number" name="purchasePrice" id="purchasePrice" defaultValue={product.purchasePrice} step="0.01" required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price (৳) *</label>
            <input type="number" name="sellingPrice" id="sellingPrice" defaultValue={product.sellingPrice} step="0.01" required className="tailwind-input" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity in Stock *</label>
            <input type="number" name="quantity" id="quantity" defaultValue={product.quantityInStock} required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit * (pcs, kg, litre)</label>
            <input type="text" name="unit" id="unit" defaultValue={product.unit} required placeholder="pcs" className="tailwind-input" />
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;