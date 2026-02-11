import { useState, useEffect } from 'react';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    
    fetch('https://dummyjson.com/products')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(function(err) {
        setError("Oops! We could not load the products. Check your internet.");
        setLoading(false);
      });

  }, []); 

  // We return these three things so our ProductList component can use them
  return { 
    products: products, 
    loading: loading, 
    error: error 
  };
}

export default useProducts;