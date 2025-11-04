import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ProductList from '../../components/inventory/ProductList'; // <-- ProductList এখন এখানে

const ProductListPage = () => {
  // InventoryLayout থেকে ক্যাটাগরি রিসিভ করা হলো
  const { categories } = useOutletContext();
  
  // প্রোডাক্ট ফেচ করা
  const { data: products, loading, refetch } = useFetch('/products');

  if (loading) {
    return <p>Loading product list...</p>;
  }

  return (
    <ProductList 
      products={products} 
      categories={categories} 
      refetchProducts={refetch} // ডিলিট করার পর রি-ফেচ করার জন্য
    />
  );
};

export default ProductListPage;