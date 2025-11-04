import React from 'react';

// 'onAddToCart' ফাংশনটি POS পেজ থেকে আসবে
const ProductCard = ({ product, onAddToCart }) => {
  const { name, sellingPrice, image, unit, quantityInStock, brand } = product;

  const handleCardClick = () => {
    if (quantityInStock > 0) {
      // কার্ডে ক্লিক করলে পুরো প্রোডাক্ট অবজেক্টটি পাস করা হচ্ছে
      onAddToCart(product);
    }
  };

  const isOutOfStock = quantityInStock === 0;
  const isLowStock = quantityInStock > 0 && quantityInStock <= 10;

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:shadow-lg ${
        isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
      }`}
    >
      <div className="h-32 w-full overflow-hidden relative">
        <img 
          src={image || 'https://via.placeholder.com/150'} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        {isOutOfStock && (
          <span className="absolute top-2 right-2 text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">
            Stock Out
          </span>
        )}
        {isLowStock && (
          <span className="absolute top-2 right-2 text-xs font-bold text-gray-800 bg-yellow-400 px-2 py-0.5 rounded-full">
            Low Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 truncate" title={name}>{name}</h3>
        <p className="text-sm text-gray-500">{brand || 'No Brand'}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-blue-600">৳{sellingPrice}</p>
          <p className="text-sm text-gray-600">/ {unit}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;