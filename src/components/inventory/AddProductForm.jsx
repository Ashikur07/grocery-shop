import React, { useState } from 'react'; // <-- useState ইম্পোর্ট করুন
import Swal from 'sweetalert2';

// --- নতুন: ImgBB API কী এবং URL ---
const IMAGEBB_API_KEY = '488622d6de61d63d1b1ba0b7b7709a4e';
const IMAGEBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`;

const AddProductForm = ({ categories, onProductAdded }) => {
  
  // --- নতুন: আপলোডিং স্টেট ---
  const [isUploading, setIsUploading] = useState(false);

  // --- handleSubmit-কে async করা হয়েছে ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // --- নতুন: ছবি আপলোড লজিক ---

    // ১. ফর্ম থেকে ফাইলটি নিন
    const imageFile = form.image.files[0];
    if (!imageFile) {
      Swal.fire('Error', 'Please upload an image.', 'error');
      return;
    }

    setIsUploading(true); // আপলোড শুরু

    // ২. imgbb-তে পাঠানোর জন্য FormData তৈরি করুন
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      // ৩. imgbb-তে ছবি আপলোড করুন
      const imgbbRes = await fetch(IMAGEBB_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        // imgbb থেকে কোনো এরর আসলে
        throw new Error(`Image upload failed: ${imgbbData.error.message}`);
      }

      // ৪. imgbb থেকে পাওয়া সরাসরি ইমেজ লিঙ্ক
      const imageUrl = imgbbData.data.display_url;

      // ৫. এখন newProduct অবজেক্ট তৈরি করুন
      const newProduct = {
          name: form.name.value,
          brand: form.brand.value,
          image: imageUrl, // <-- imgbb লিঙ্ক
          categoryId: form.category.value,
          purchasePrice: parseFloat(form.purchasePrice.value),
          sellingPrice: parseFloat(form.sellingPrice.value),
          quantityInStock: parseInt(form.quantity.value),
          unit: form.unit.value
      };

      // ৬. আপনার ব্যাকএন্ডে প্রোডাক্ট সেভ করুন (await ব্যবহার করে)
      const productRes = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const productData = await productRes.json();

      if (productData.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: 'The new product has been added.'
        });
        form.reset();
        onProductAdded();
      } else {
        throw new Error('Failed to save product to database.');
      }

    } catch (err) {
      // imgbb বা আপনার ব্যাকএন্ড, যেকোনো এরর এখানে ধরা পড়বে
      console.error("Submission failed:", err);
      Swal.fire('Error', `Submit failed: ${err.message}`, 'error');
    } finally {
      setIsUploading(false); // আপলোড শেষ (সফল হোক বা না হোক)
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input type="text" name="name" id="name" required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input type="text" name="brand" id="brand" className="tailwind-input" />
          </div>
        </div>

        {/* --- আপডেট: ইমেজ ইনপুট (type="file") --- */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Upload *</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            required 
            accept="image/*" // শুধু ছবি আপলোড করতে দিন
            className="tailwind-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {/* ------------------------------------- */}

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select name="category" id="category" required className="tailwind-input">
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price (৳) *</label>
            <input type="number" name="purchasePrice" id="purchasePrice" step="0.01" required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price (৳) *</label>
            <input type="number" name="sellingPrice" id="sellingPrice" step="0.01" required className="tailwind-input" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Initial Quantity *</label>
            <input type="number" name="quantity" id="quantity" required className="tailwind-input" />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit * (pcs, kg, litre)</label>
            <input type="text" name="unit" id="unit" required placeholder="pcs" className="tailwind-input" />
          </div>
        </div>

        {/* --- আপডেট: সাবমিট বাটন (লোডিং স্টেট সহ) --- */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isUploading} // <-- আপলোড চলাকালীন বাটন ডিসেবল
            className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isUploading ? 'Uploading Image...' : 'Add Product'}
          </button>
        </div>
        {/* ----------------------------------------- */}

      </form>
    </div>
  );
};
export default AddProductForm;