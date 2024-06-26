import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthToken';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';


const BuyNowPage = () => {
  const location = useLocation();
  const { products, product, totalAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const { addToCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const { token } = useAuth();

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod' && !address) {
      alert('Please enter your address for Cash on Delivery.');
      return;
    }

    if (product) {
      await addToCart(product._id, 1); // Ensure product is in cart
    } else if (products) {
      for (let item of products) {
        await addToCart(item.product._id, item.quantity); // Ensure product is in cart
      }
    }

    await placeOrder();  // Place the order
    navigate('/order-confirmation');  // Redirect to order confirmation page
  };
  
  const handlePayment = async () => {
    try {
      const stripePromise = await loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const cartItems = products || [{ product, quantity: 1 }];
      const response = await axios.post('http://localhost:1000/api/v1/payment', { cartItems }, {
        headers: { 'auth-token': token },
      });

      console.log(response.data);

      // Handle Stripe checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment error: ", error);
      alert("Payment failed, please try again.");
    }
  };

  const renderProductDetails = (item) => (
    <div key={item.product._id} className="mb-4">
      <img
        className="w-full h-auto object-contain bg-gray-200"
        src={`http://localhost:1000/image/${item.product.image}`}
        alt={item.product.name}
      />
      <div className="text-gray-900 font-bold text-3xl mb-2">{item.product.name}</div>
      <div className="text-gray-900 text-xl mb-4">Price: ₹{item.product.price * item.quantity}</div>
    </div>
  );

  const total = totalAmount || (product ? product.price : 0);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          {product ? renderProductDetails({ product, quantity: 1 }) : products.map(renderProductDetails)}
        </div>
        <div className="p-4">
          <div className="text-gray-900 text-xl mb-4">Total: ₹{total}</div>

          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Select Payment Method</h2>
            <div className="flex items-center">
            <button onClick={handlePaymentChange}>Cash on Delivery</button>
    
            </div>
            <div className="flex items-center">
             <button onClick={handlePayment}>Online</button>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
