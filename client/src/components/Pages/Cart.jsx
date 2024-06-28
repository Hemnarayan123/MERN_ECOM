import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthToken';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!cart || !cart.items.length) {
    return <div>Your cart is empty</div>;
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    console.log(`Changing quantity for product ${productId} to ${quantity}`); // Debug log
    updateCartItem(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    console.log(`Removing product ${productId} from cart`); // Debug log
    removeFromCart(productId);
  };

  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleBuyNow = () => {
    navigate('/buy-now', { state: { products: cart.items, totalAmount } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        {cart.items.map(item => (
          <div key={item.product._id} className="flex items-center justify-between mb-4">
            <img
              className="w-16 h-16 object-contain"
              src={`http://localhost:1000/image/${item.product.image}`}
              alt={item.product.name}
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-bold">{item.product.name}</h2>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="bg-gray-200 px-2 py-1 rounded-lg"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <span className="text-lg font-bold">₹{item.product.price * item.quantity}</span>
            <button
              onClick={() => handleRemoveItem(item.product._id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              &times;
            </button>
          </div>
        ))}
        <div className="text-right text-xl font-bold">
          Total: ₹{totalAmount}
        </div>
        <button
          onClick={handleBuyNow}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
