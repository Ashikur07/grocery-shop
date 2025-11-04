import React from 'react';
import { FaDollarSign, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

const iconMap = {
  sales: FaShoppingCart,
  profit: FaMoneyBillWave,
  default: FaDollarSign
};
const colorMap = {
  sales: 'bg-blue-100 text-blue-600',
  profit: 'bg-green-100 text-green-600',
  default: 'bg-gray-100 text-gray-600'
};

const StatCard = ({ title, value, iconType = 'default', unit = '৳' }) => {
  const IconComponent = iconMap[iconType] || iconMap.default;
  const colors = colorMap[iconType] || colorMap.default;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">
          {unit} {value.toFixed(2)}
        </p>
      </div>
      <div className={`p-3 rounded-full ${colors}`}>
        <IconComponent size={24} />
      </div>
    </div>
  );
};
export default StatCard;