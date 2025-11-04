import React from 'react';
// নতুন আইকন ইম্পোর্ট করা হলো
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">Get In Touch</h1>
          <p className="text-lg text-gray-500 mt-4">We'd love to hear from you!</p>
        </div>

        {/* কন্টেন্ট গ্রিড */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2">
          
          {/* কন্টাক্ট ইনফো (বাম পাশ) */}
          <div className="p-8 lg:p-12 bg-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন অথবা নিচের ফর্মটি পূরণ করুন।
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-2xl text-blue-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Address</h3>
                  <p className="text-blue-100">123 Main Street, Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaPhoneAlt className="text-2xl text-blue-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-blue-100">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-2xl text-blue-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-blue-100">info@amardokan.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* কন্টাক্ট ফর্ম (ডান পাশ) */}
          <div className="p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required className="tailwind-input" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" required className="tailwind-input" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows="4" required className="tailwind-input" placeholder="Your message..."></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;