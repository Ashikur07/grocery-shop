import { useState, useEffect } from 'react';

// API-এর বেস URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}${url}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  // ডেটা রি-ফেচ করার জন্য একটি ফাংশন
  const refetch = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}${url}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
};

export default useFetch;