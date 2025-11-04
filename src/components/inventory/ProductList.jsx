import React, { useState, useMemo } from 'react'; // <-- useState এবং useMemo ইম্পোর্ট করা হয়েছে
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // <-- FaSearch ইম্পোর্ট করা হয়েছে
import Swal from 'sweetalert2';

// products, categories, refetchProducts - এই prop-গুলো এখন InventoryLayout থেকে আসবে
const ProductList = ({ products, categories, refetchProducts }) => {
  
  // --- নতুন: ফিল্টার স্টেট ---
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' মানে কোনো ফিল্টার নেই

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'N/A';
  };

  const handleDelete = (productId, productName) => {
    // ... (আপনার ডিলিট কোড অপরিবর্তিত)
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete "${productName}"? You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            refetchProducts();
          } else {
            Swal.fire('Error', 'Could not delete product.', 'error');
          }
        });
      }
    });
  };

  // --- নতুন: ফিল্টারিং লজিক ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, categoryFilter]); // raw 'products' prop-এর উপর ফিল্টার চলবে
  
  return (
    // মূল কন্টেইনার
    <div className="w-full bg-white p-8 rounded-lg shadow-xl">

      {/* --- নতুন: ফিল্টার সেকশন (টেবিলের উপরে) --- */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* ১. ক্যাটাগরি ড্রপডাউন */}
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">
              Filter by Category
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="tailwind-input mt-1" 
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* ২. নাম দিয়ে সার্চ */}
          <div>
            <label htmlFor="searchProduct" className="block text-sm font-medium text-gray-700">
              Search by Name/Brand
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="searchProduct"
                placeholder="e.g., Khata or Matador"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tailwind-input pr-10"
              />
              <FaSearch className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

        </div>
      </div>
      {/* --- ফিল্টার সেকশন শেষ --- */}


      {/* --- প্রোডাক্ট টেবিল --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            
            {/* .map এখন 'filteredProducts' ভেরিয়েবল ব্যবহার করবে */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryName(product.categoryId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.quantityInStock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.quantityInStock} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">৳{product.sellingPrice}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/dashboard/inventory/edit/${product._id}`}
                        className="text-blue-600 hover:text-blue-900 transition duration-150"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="text-red-600 hover:text-red-900 transition duration-150"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // যখন কোনো প্রোডাক্ট পাওয়া যাবে না
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No products found matching your criteria.
                </td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;