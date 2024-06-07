import React from "react";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthToken";



const Header = () => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const {isSignIn, SignoutUser} = useAuth()

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
  };
  return (
<>

<nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link href="#home">ShopLogo</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to ="/home" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to ="/shop" className="text-white hover:text-gray-300">Shop</Link>
          </li>
          <li>
            <Link to ="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-2 py-1 rounded"
          />
        
         
        </div>
      
        {
            isSignIn?(
            <div className="relative flex gap-1">
        <Link href="#cart" className="text-white flex items-center hover:text-gray-300">
            <FaShoppingCart className="mr-1" />
          </Link>
            <button
              onClick={toggleAccountDropdown}
              className="text-white flex items-center hover:text-gray-300"
            >
              <FaUser className="mr-1" /> <IoIosArrowDown/>
            </button>
            {accountDropdownOpen && (
              <div className="absolute right-0 t mt-2 w-48 bg-white rounded shadow-lg py-2 z-10">
                <Link to={'/#'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <Link to="/order" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Wishlist</Link>
                <Link to ="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                <Link to ="/signout" onClick={SignoutUser} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
              </div>
            )}
            
          </div>
            
           ) : (
            <Link to="/signin" className="text-white hover:text-gray-300">Login</Link>
           )
          }
        
        
      </div>
    </nav>

</>
  );
};

export default Header;
