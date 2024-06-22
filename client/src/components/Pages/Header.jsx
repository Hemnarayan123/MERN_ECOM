import React, { useState } from "react";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthToken";

const Header = () => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { isSignIn, SignoutUser, role } = useAuth();

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/">ShopLogo</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="text-white hover:text-gray-300">Shop</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </li>
          {role === 'admin' && (
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Admin Dashboard</Link>
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-2 py-1 rounded"
          />
        </div>
        {isSignIn ? (
          <div className="relative flex gap-1">
            <button
              onClick={toggleAccountDropdown}
              className="text-white flex items-center hover:text-gray-300"
            >
              <FaUser className="mr-1" /> <IoIosArrowDown />
              <Link to="/cart" className="text-white flex items-center hover:text-gray-300">
            <Link to={'/cart'}><FaShoppingCart className="mr-1" /></Link>
          </Link>
            </button>
            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-10">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <Link to="/order" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Wishlist</Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                <Link to="/signout" onClick={SignoutUser} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="text-white hover:text-gray-300">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
