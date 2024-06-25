import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
   <>
 <footer className="bg-blue-600 p-4 mt-8">
      <div className="container mx-auto text-white">
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold">ShopLogo</h4>
            <p>&copy; 2024 ShopLogo. All rights reserved.</p>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to={'/privacy'} className="hover:text-gray-300">Privacy Policy</Link>
            </li>
            <li>
              <Link to={'/term'} className="hover:text-gray-300">Terms of Service</Link>
            </li>
            <li>
              <Link to={'/contact'} className="hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h5 className="font-bold">Follow Us</h5>
          <ul className="flex space-x-4 mt-2">
            <li>
              <Link to={'/facebook'} className="hover:text-gray-300">Facebook</Link>
            </li>
            <li>
              <Link to={'/insta'} className="hover:text-gray-300">Instagram</Link>
            </li>
            <li>
              <Link to={'/youtube'} className="hover:text-gray-300">Twitter</Link>
            </li>
            <li>
              <Link to={'/twitter'} className="hover:text-gray-300">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
   </>
  )
}

export default Footer