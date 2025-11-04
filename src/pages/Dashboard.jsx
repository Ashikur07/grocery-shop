import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import StatCard from '../components/dashboard/StatCard';
import { FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FilterButtons = ({ activeFilter, setFilter }) => {
  const filters = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'all', label: 'All Time' },
  ];

  const baseClass = "px-4 py-2 rounded-md font-semibold transition";
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-white text-gray-700 hover:bg-gray-100";

  return (
    <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`${baseClass} ${f.key === activeFilter ? activeClass : inactiveClass}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};


const Dashboard = () => {
  const [filter, setFilter] = useState('today');
  const { data: reportData, loading } = useFetch(`/dashboard/sales-report?filter=${filter}`);

  if (loading || !reportData) {
    return <div className="p-8">Loading Dashboard Report...</div>;
  }

  const { productReport, summary } = reportData;
  const topProducts = productReport.slice(0, 7);

  const chartData = {
    labels: topProducts.map(p => p._id), 
    datasets: [
      {
        label: 'Total Profit (৳)',
        data: topProducts.map(p => p.totalProfit),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Sales (৳)',
        data: topProducts.map(p => p.totalSellingPrice), 
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // --- ভুলটি এখানে ছিল ---
  // আমি chartOptions দুইবার ডিক্লেয়ার করেছিলাম।
  // নিচেরটি হলো সঠিক, একটি মাত্র ডিক্লারেশন।
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Top 7 Profitable Products (${filter})` },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Overview</h1>
        <FilterButtons activeFilter={filter} setFilter={setFilter} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title={`Total Sales (${filter})`}
          value={summary.grandTotalSales} 
          iconType="sales" 
        />
        <StatCard 
          title={`Total Profit (${filter})`}
          value={summary.grandTotalProfit} 
          iconType="profit" 
        />
        <StatCard 
          title={`Products Sold (${filter})`}
          value={productReport.reduce((acc, p) => acc + p.totalQuantitySold, 0)} 
          iconType="default"
          unit="pcs" 
        />
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaChartBar className="mr-2 text-blue-600" />
            Product Wise Report
        </h2>
        {topProducts.length > 0 ? (
            <Bar options={chartOptions} data={chartData} />
        ) : (
            <p className="text-center text-gray-500 py-4">
                No sales data found for "{filter}".
            </p>
        )}
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Full Sales Report ({filter})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Sell Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Profit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productReport.length > 0 ? (
                productReport.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.totalQuantitySold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳{product.totalCostPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳{product.totalSellingPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">৳{product.totalProfit.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">No sales data found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;