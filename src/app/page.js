"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to RQ</h1>
      {loading && <p className="text-yellow-400">Loading products...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
