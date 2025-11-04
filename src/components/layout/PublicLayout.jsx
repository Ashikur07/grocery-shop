import React, { useState, useEffect } from 'react'; // <-- ১. useEffect ইম্পোর্ট করুন
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer'; 
import QuantityModal from '../pos/QuantityModal';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';

const PublicLayout = () => {
  
  // --- ২. আপডেট: localStorage থেকে ডেটা লোড করা ---
  const [cart, setCart] = useState(() => {
    // অ্যাপ লোড হওয়ার সময় localStorage থেকে পুরনো কার্ট খোঁজা
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        // যদি পাওয়া যায়, সেটাকে parse করে স্টেট-এ সেট করা
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        return []; // ভুল ডেটা থাকলে খালি অ্যারে
      }
    }
    return []; // কিছুই না থাকলে খালি অ্যারে
  });
  // ---------------------------------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { refetch: refetchProducts } = useFetch('/products'); 

  // --- ৩. আপডেট: localStorage-এ ডেটা সেভ করা ---
  // এই useEffect হুকটি 'cart' স্টেটের যেকোনো পরিবর্তনে কাজ করবে
  useEffect(() => {
    // 'cart' অ্যারে-কে স্ট্রিং-এ রূপান্তর করে localStorage-এ সেভ করা
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // যখনই 'cart' পরিবর্তন হবে, তখনই এটা রান হবে
  // ------------------------------------------

  // --- মডাল কন্ট্রোল (অপরিবর্তিত) ---
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // --- কার্ট ম্যানেজমেন্ট ফাংশন (অপরিবর্তিত) ---
  const handleConfirmAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      let newQuantity = quantity;
      if (existingItem) {
        newQuantity += existingItem.quantity;
      }

      if (newQuantity > product.quantityInStock) {
        Swal.fire({
          icon: 'warning',
          title: 'Stock Limit Reached',
          text: `Available: ${product.quantityInStock}. You already have ${existingItem?.quantity || 0} in cart.`
        });
        return prevCart;
      }
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item._id !== productId));
    } else {
      setCart(prevCart => prevCart.map(item => {
        if (item._id === productId) {
          if (newQuantity > item.quantityInStock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock Limit',
                text: 'You cannot add more of this item!',
                timer: 1500,
                showConfirmButton: false
            });
            return item; 
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }));
    }
  };
  
  const handleClearCart = () => {
    setCart([]);
  };

  const handleSaleSuccess = () => {
    setCart([]); 
    refetchProducts();
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <PublicNavbar cartItemCount={cartItemCount} />
        
        <main className="flex-grow">
          {/* --- ৪. আপডেট: Outlet-কেও 'cart' পাস করা --- */}
          {/* (যেন CartPage সবসময় আপ-টু-ডেট ডেটা পায়) */}
          <Outlet context={{
            cart, 
            handleProductClick, 
            handleUpdateQuantity, 
            handleClearCart, 
            handleSaleSuccess 
          }} />
        </main>

        <Footer />
      </div>

      <QuantityModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onConfirm={handleConfirmAddToCart}
      />
    </>
  );
};

export default PublicLayout;