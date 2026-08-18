
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      // Fake payment ID for bypass
      const paymentId = 'bypass_' + Date.now();

      const response = await fetch(`${config.API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.qty ?? item.quantity ?? 1,
            price: item.price
          })),
          totalAmount: totalPrice,
          address: {
            fullname: address.fullName,
            street: address.street,
            city: address.city,
            postalcode: address.postalCode,
            country: address.country
          },
          paymentId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Order failed');
        return;
      }

      dispatch(clearCart());

      navigate('/ordersuccess');

    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">

          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />

          <div className="checkout-summary">
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>

            <button type="submit" className="btn">
              Pay Now
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;






 
