import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import config from '../config'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const res = await fetch(`${config.API_URL}/products)`);
        const data = await res.json();
        setProducts(data.slice(0,4)); //featured products
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false);
      }
    };

    fetchProducts(); 
  },[])
 



  return (
    <div className='home-container'>
      <div className='hero-banner'>
        <h1>welcome to shopnest</h1>
        <p>Discover the best products at unbeatable prices </p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className='product-grid'>
          {products.map((product)=>(
            <ProductCard key={product._id} product = {product}/>
          ))}
        </div>
      )}
    </div> 
    
  )
}

export default Home
