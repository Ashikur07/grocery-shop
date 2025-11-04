import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/pos/ProductCard'; // POS-এর নিজস্ব কার্ড
import Cart from '../components/pos/Cart';
import QuantityModal from '../components/pos/QuantityModal'; // নতুন মডাল

const POS = () => {
  const { data: products, loading, refetch: refetchProducts } = useFetch('/products');
  const [cart, setCart] = useState([]);
  
  // মডালের স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ১. প্রোডাক্টে ক্লিক করলে মডাল ওপেন হবে
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ২. মডাল থেকে কনফার্ম করলে কার্টে যোগ হবে
  const handleConfirmAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      let newQuantity = quantity;
      if (existingItem) {
        newQuantity += existingItem.quantity; // আগের পরিমাণের সাথে নতুনটা যোগ
      }

      // মোট পরিমাণ যেন স্টকের বেশি না হয়
      if (newQuantity > product.quantityInStock) {
        alert(`Stock limit reached! You already have ${existingItem.quantity} in cart.`);
        return prevCart;
      }
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });
  };

  // ৩. কার্ট ও সেলস ফাংশন
  const handleClearCart = () => setCart([]);

  const handleSaleSuccess = () => {
    setCart([]); 
    refetchProducts(); // স্টক আপডেটের জন্য রি-ফেচ
  };
  
  const handleUpdateQuantityInCart = (productId, newQuantity) => {
    // (Cart.jsx থেকে এই ফাংশন কল করতে হবে)
     if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item._id !== productId));
    } else {
       // (স্টক চেক করা উচিত)
      setCart(prevCart => prevCart.map(item => 
        item._id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  if (loading) {
    return <div className="p-8">Loading POS...</div>;
  }

  return (
    <>
      <div className="flex h-screen">
        {/* Product List Area */}
        <div className="w-3/4 p-6 overflow-y-auto bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={handleProductClick} // onAddToCart এখন মডাল ওপেন করে
              />
            ))}
          </div>
        </div>

        {/* Cart Area */}
        <div className="w-1/4 h-full">
          <Cart 
            cartItems={cart}
            onClearCart={handleClearCart}
            onSaleConfirm={handleSaleSuccess}
            onUpdateQuantity={handleUpdateQuantityInCart}
          />
        </div>
      </div>

      {/* Quantity Modal */}
      <QuantityModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddToCart}
      />
    </>
  );
};

export default POS;