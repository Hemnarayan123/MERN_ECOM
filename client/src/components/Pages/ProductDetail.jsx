import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthToken';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async () => {
    addToCart(product._id, 1);
  };

  const handleBuyNow = () => {
    navigate('/buy-now', { state: { product } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg md:flex">
        <div className="md:w-1/2 p-4">
          <img
            className="w-full h-auto object-contain bg-gray-200"
            src={`http://localhost:1000/image/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="md:w-1/2 p-4">
          <div className="text-gray-900 font-bold text-3xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <div className="text-gray-900 text-xl mb-4">Price: ₹{product.price}</div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-700">
              Wishlist
            </button>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
