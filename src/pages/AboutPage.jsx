import React from 'react';
// নতুন আইকন ইম্পোর্ট করা হলো
import { FaLeaf, FaShippingFast, FaSmile } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* --- হিরো সেকশন (ছবি) --- */}
      <div 
        className="h-80 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')" }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white">About 'আমার দোকান'</h1>
        </div>
      </div>

      {/* --- কন্টেন্ট সেকশন --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-xl p-8 lg:p-12">
          
          {/* Our Mission */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              আমাদের লক্ষ্য হলো স্থানীয় দোকানদারদের জন্য একটি সহজ, শক্তিশালী এবং সাশ্রয়ী ম্যানেজমেন্ট সিস্টেম তৈরি করা। আমরা বিশ্বাস করি, সঠিক টেকনোলজি ব্যবহারের মাধ্যমে যেকোনো ছোট ব্যবসাও বড় প্রতিষ্ঠানে পরিণত হতে পারে।
            </p>
          </div>
          
          <hr className="my-12" />

          {/* Why Choose Us? */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Feature 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLeaf size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-500">We ensure the best quality products by managing inventory effectively.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShippingFast size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Reporting</h3>
                <p className="text-gray-500">Get instant sales and profit reports for Today, This Week, or This Month.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSmile size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-500">A clean interface that anyone can use without prior training.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;