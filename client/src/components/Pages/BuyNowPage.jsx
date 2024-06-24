import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const BuyNowPage = () => {
  const location = useLocation();
  const { products, product, totalAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const { addToCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod' && !address) {
      alert('Please enter your address for Cash on Delivery.');
      return;
    }
    if (paymentMethod === 'online' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please enter your card details for Online Payment.');
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
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                onChange={() => handlePaymentChange('cod')}
                className="mr-2"
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="online"
                name="payment"
                value="online"
                onChange={() => handlePaymentChange('online')}
                className="mr-2"
              />
              <label htmlFor="online">Online Payment</label>
            </div>
          </div>

          {paymentMethod === 'cod' && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Enter Delivery Address</h2>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          )}

          {paymentMethod === 'online' && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Enter Card Details</h2>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded-lg mb-2"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full p-2 border rounded-lg mb-2"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded-lg mb-2"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </div>
          )}

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
