import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductShowcaseCard from '../components/public/ProductShowcaseCard';
import Searchbar from '../components/public/Searchbar';

const Banner = () => {
  return (
    <div 
      className="h-80 rounded-lg bg-cover bg-center flex items-center justify-center text-center p-8 mb-10 shadow-lg"
      style={{ backgroundImage: "url('https://www.retail.org.au/wp-content/uploads/Article-Preview-Image-81.png')" }}
      data-aos="fade-down" // <-- ব্যানার অ্যানিমেশন
    >
      <div 
        className="bg-black bg-opacity-60 p-8 rounded-lg"
        data-aos="fade-in" // <-- ব্যানার টেক্সট অ্যানিমেশন
        data-aos-delay="200"
      >
        <h1 className="text-4xl font-bold text-white mb-2 shadow-lg">Welcome to 'আমার দোকান'</h1>
        <p className="text-xl text-white shadow-md">Click on a product to add to cart</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { handleProductClick } = useOutletContext(); 
  
  const { data: products, loading: loadingProducts } = useFetch('/products');
  const { data: categories, loading: loadingCategories } = useFetch('/categories');
  const [searchTerm, setSearchTerm] = useState('');

  const isLoading = loadingProducts || loadingCategories;

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const productsByCategory = {};
  if (!isLoading) {
    categories.forEach(category => {
      const items = filteredProducts.filter(p => p.categoryId === category._id);
      if (items.length > 0) {
        productsByCategory[category.name] = items;
      }
    });
  }

  return (
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-10">
      <Banner />
      
      {/* সার্চবার অ্যানিমেশন (একটি wrapper div দিয়ে) */}
      <div data-aos="fade-up" data-aos-delay="100">
        <Searchbar onSearchChange={setSearchTerm} />
      </div>

      {isLoading ? (
        <p className="text-center text-xl">Loading products...</p>
      ) : (
        <div className="space-y-12">
          {Object.keys(productsByCategory).length > 0 ? (
            Object.keys(productsByCategory).map(categoryName => (
              
              // ক্যাটাগরি সেকশন অ্যানিমেশন
              <section key={categoryName} data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">
                  {categoryName}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  
                  {/* কার্ড অ্যানিমেশন (Staggered effect) */}
                  {productsByCategory[categoryName].map((product, index) => (
                    <div 
                      key={product._id} 
                      data-aos="fade-up" 
                      data-aos-delay={index * 50} // <-- কার্ডগুলো একটার পর একটা আসবে
                    >
                      <ProductShowcaseCard 
                        product={product}
                        onProductClick={handleProductClick}
                      />
                    </div>
                  ))}
                  
                </div>
              </section>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">No products found matching "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;