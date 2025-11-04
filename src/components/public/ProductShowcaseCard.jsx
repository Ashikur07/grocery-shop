import React from 'react';

const ProductShowcaseCard = ({ product, onProductClick }) => {
  const { name, sellingPrice, image, unit, quantityInStock, brand } = product;
  const isOutOfStock = quantityInStock === 0;

  const handleClick = () => {
    if (!isOutOfStock) {
      onProductClick(product); // মডাল ওপেন করার জন্য Layout-কে বলা
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:shadow-lg ${
        isOutOfStock 
        ? 'opacity-60 cursor-not-allowed' 
        : 'cursor-pointer hover:-translate-y-1'
      }`}
    >
      <div className="h-40 w-full overflow-hidden relative">
        <img 
          src={image || 'https://via.placeholder.com/150'} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        {isOutOfStock && (
          <span className="absolute top-2 left-2 text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full z-10">
            Stock Out
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 truncate">{brand || 'No Brand'}</p>
        <h3 className="text-md font-semibold text-gray-800 truncate" title={name}>
          {name}
        </h3>
        
        <div className="flex justify-between items-center mt-3">
          <p className="text-xl font-bold text-blue-600">৳{sellingPrice}</p>
          <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
            {quantityInStock} {unit} left
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseCard;