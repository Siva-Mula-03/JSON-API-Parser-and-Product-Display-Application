import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const productData = response.data.products;
        const productArray = Object.keys(productData).map(key => ({
          id: key,
          ...productData[key]
        }));

        const sortedProducts = productArray.sort((a, b) => b.popularity - a.popularity);
        setProducts(sortedProducts);
        console.log('Fetched Products:', sortedProducts);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Products</h1>

      {/* Search input */}
      <input 
      class="search"
        type="text" 
        placeholder="Search products by title..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <h4>Price: ${product.price}</h4>
              <h4>Popularity: {product.popularity}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
