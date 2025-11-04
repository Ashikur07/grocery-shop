import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Cart from '../components/pos/Cart'; // আমরা Cart কম্পোনেন্টটি এখানে রেন্ডার করব

const CartPage = () => {
  // PublicLayout-এর context থেকে সব গ্লোবাল স্টেট ও ফাংশন রিসিভ করা হলো
  const { cart, handleUpdateQuantity, handleClearCart, handleSaleSuccess } = useOutletContext();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {cart.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
          <Cart 
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onSaleConfirm={handleSaleSuccess}
          />
        </div>
      ) : (
        <div className="text-center bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;