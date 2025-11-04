import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

// --- নতুন: রসিদ প্রিন্ট করার জন্য হেলপার ফাংশন ---
const printReceipt = (cartItems, totalAmount) => {
  const today = new Date();
  // বাংলাদেশী ফরম্যাটে তারিখ ও সময়
  const date = today.toLocaleDateString('bn-BD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const time = today.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // টেবিলের সারি তৈরি করা
  let tableRows = '';
  cartItems.forEach(item => {
    tableRows += `
      <tr>
        <td>${item.name}</td>
        <td class="center">${item.quantity}</td>
        <td class="right">৳${item.sellingPrice.toFixed(2)}</td>
        <td class="right">৳${(item.quantity * item.sellingPrice).toFixed(2)}</td>
      </tr>
    `;
  });

  // রসিদের জন্য HTML টেমপ্লেট
  const receiptHtml = `
  <html>
    <head>
      <title>Order Receipt</title>
      <style>
        @media print {
          body { margin: 0; padding: 0; }
          .container { box-shadow: none; border: none; }
        }
        body { font-family: 'Arial', 'Segoe UI', sans-serif; margin: 0; }
        .container { 
          width: 300px; /* সাধারণত রসিদ প্রিন্টারের মাপ */
          margin: 20px auto; 
          padding: 15px; 
          border: 1px dashed #888;
        }
        h2 { text-align: center; margin: 0 0 5px 0; }
        p { text-align: center; font-size: 12px; margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 8px 5px; border-bottom: 1px dashed #ddd; font-size: 14px; }
        th { text-align: left; background-color: #f9f9f9; }
        .center { text-align: center; }
        .right { text-align: right; }
        .total-row td { 
          font-weight: bold; 
          font-size: 16px; 
          border-top: 2px solid #333; 
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>আমার দোকান</h2>
        <p>Thank you for your purchase!</p>
        <p>Date: ${date} | Time: ${time}</p>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="center">Qty</th>
              <th class="right">Price</th>
              <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        
        <table>
          <tr class="total-row">
            <td colspan="3">Total</td>
            <td class="right">৳${totalAmount.toFixed(2)}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 10px;">Powered by GroceryMS</p>
      </div>
    </body>
  </html>
  `;

  // নতুন উইন্ডো খুলে প্রিন্ট করা
  const printWindow = window.open('', '_blank', 'width=400,height=600');
  printWindow.document.write(receiptHtml);
  printWindow.document.close();
  printWindow.focus();
  // রেন্ডার হওয়ার জন্য সামান্য সময় দেওয়া
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
// --- হেলপার ফাংশন শেষ ---


const Cart = ({ cartItems, onUpdateQuantity, onClearCart, onSaleConfirm }) => {
  
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
  const totalProfit = cartItems.reduce((acc, item) => acc + (item.sellingPrice - item.purchasePrice) * item.quantity, 0);

  const handleConfirmSale = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Empty Cart',
        text: 'Your cart is empty!'
      });
      return;
    }
    
    const saleData = {
        items: cartItems.map(item => ({
          productId: item._id, name: item.name, quantity: item.quantity,
          soldAtPrice: item.sellingPrice, purchasePrice: item.purchasePrice
        })),
        totalAmount: totalAmount, 
        totalProfit: totalProfit
    };

    fetch(`${import.meta.env.VITE_API_URL}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId) {
        
        // --- আপডেট: সেল সফল হলে প্রিন্টের জন্য জিজ্ঞেস করা ---
        Swal.fire({
          icon: 'success',
          title: 'Sale Confirmed!',
          text: 'Do you want to print a receipt?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Print Receipt',
          cancelButtonText: 'No, Thanks'
        }).then((result) => {
            if (result.isConfirmed) {
                // 'Yes' ক্লিক করলে প্রিন্ট ফাংশন কল হবে
                printReceipt(cartItems, totalAmount);
            }
            // প্রিন্ট হোক বা না হোক, কার্ট ক্লিয়ার হবে
            onSaleConfirm(); 
        });
        // --------------------------------------------------

      } else {
        Swال.fire({
          icon: 'error',
          title: 'Sale Failed',
          text: 'Something went wrong. Please try again.'
        });
      }
    })
    .catch(err => {
        console.error("Error confirming sale:", err);
        Swal.fire({
          icon: 'error',
          title: 'Sale Failed',
          text: 'Could not connect to the server.'
        });
    });
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-lg flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold">Billing Cart</h2>
        {cartItems.length > 0 && (
          <button onClick={onClearCart} title="Clear Cart" className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2" style={{maxHeight: '400px'}}>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center space-x-3">
                <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 mx-2 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">৳{item.sellingPrice} x {item.quantity} = ৳{item.sellingPrice * item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => onUpdateQuantity(item._id, item.quantity - 1)} className="p-1.5 bg-gray-200 rounded-full text-xs">
                    {item.quantity === 1 ? <FaTrash className="text-red-500" /> : <FaMinus />}
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => {
                      onUpdateQuantity(item._id, item.quantity + 1)
                    }} 
                    className="p-1.5 bg-gray-200 rounded-full text-xs"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t-2">
        <div className="flex justify-between font-bold text-2xl mb-4">
          <span>Total:</span>
          <span>৳{totalAmount.toFixed(2)}</span>
        </div>
        <button 
          onClick={handleConfirmSale}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 text-lg disabled:opacity-50"
          disabled={cartItems.length === 0}
        >
          Confirm Sale
        </button>
      </div>
    </div>
  );
};
export default Cart;