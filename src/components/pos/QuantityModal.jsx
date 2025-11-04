import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // <-- ইম্পোর্ট করুন

const QuantityModal = ({ product, isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    const numQuantity = parseInt(quantity, 10);
    if (numQuantity > 0 && numQuantity <= product.quantityInStock) {
      onConfirm(product, numQuantity);
      onClose();
    } else if (numQuantity > product.quantityInStock) {
      // --- Alert আপডেট করা হয়েছে ---
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Stock limit reached! Available: ${product.quantityInStock}`
      });
      // ------------------------------
    } else {
      // --- Alert আপডেট করা হয়েছে ---
      Swal.fire({
        icon: 'error',
        title: 'Invalid Quantity',
        text: 'Please enter a valid quantity'
      });
      // ------------------------------
    }
  };
  
  const handleQuantityChange = (e) => {
    // ... (এই ফাংশন অপরিবর্তিত) ...
    const val = e.target.value;
    if (val === '') {
        setQuantity('');
    } else {
        const num = parseInt(val, 10);
        if (num > 0) {
            setQuantity(num);
        }
    }
  };

  return (
    // ... (JSX অপরিবর্তিত) ...
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
        <p className="text-sm text-gray-500 mb-4">Available Stock: {product.quantityInStock} {product.unit}</p>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={product.quantityInStock}
            className="tailwind-input mt-1"
            autoFocus
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;