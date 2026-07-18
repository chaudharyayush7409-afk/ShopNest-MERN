import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchProduct =async ()=>{
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);


            } catch (error) {
                console.error(error)
            } finally{
                setLoading(false);
            }
        };
        fetchProduct();
    },[id]);

    const handleAddToCart = () => {
        if(product){
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1
            }));
            alert('Successfully added to your cart!')
        }
    }

    if(loading) return <div style={{textAlign:'center',margin:'100px',color:'#f97316'}}>Loading Product...</div>
    if(!product) return <div style={{textAlign:'center',margin:'100px',color:'#f97316'}}>Product not found</div>



    return (
    <div className='product-detail-wrapper'>

      {/* Breadcrumb Navigation */}
      <div style={{color:'#a1a1aa',marginBottom:'20px', fontSize:'0.95rem'}}>
        <Link to='/' style={{color:'#f97316'}}>Home</Link> / <Link to='/shop' style={{color:'#f97316'}}>Shop</Link> /
        {product.category} / <span style={{color:'#fff'}}>{product.name}</span>
      </div>

      <div className='product-details'>
        {/* left side image */}
        <div className='detail-image-container'>
            <img src={product.imageUrl} alt={product.name} className='detail-image'/>
        </div>

        {/* right side information block: name, price, description,stock (stacked) */}
        <div className='detail-info'>
            <div style={{marginBottom:'70px'}}>
                <h2>{product.name}</h2>
                <p className='detail-price'>₹{product.price.toFixed(2)}</p>
            </div>

            <div style={{marginBottom:'50px'}} className='detail-description-wrapper'>
                <h4>product description</h4>
                <p className='detail-description'>{product.description}</p>
            </div>

            <div className='detail-footer'>
                <div className='product-actions'>
                    <button onClick={handleAddToCart} className='btn'>Add to cart</button>
                </div>

                <p className={product.stock > 0 ? 'stock-badge in' : 'stock-badge out'}>
                    {product.stock > 0 ? `In stock (${product.stock} units available)` : `Temporarily Out of Stock`}
                </p>
            </div>
        </div>

      </div>


    </div>
  )
}

export default ProductDetails
