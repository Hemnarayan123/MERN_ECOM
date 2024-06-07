import React from 'react'

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
              <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms" className="hover:text-gray-300">Terms of Service</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h5 className="font-bold">Follow Us</h5>
          <ul className="flex space-x-4 mt-2">
            <li>
              <a href="#facebook" className="hover:text-gray-300">Facebook</a>
            </li>
            <li>
              <a href="#instagram" className="hover:text-gray-300">Instagram</a>
            </li>
            <li>
              <a href="#twitter" className="hover:text-gray-300">Twitter</a>
            </li>
            <li>
              <a href="#linkedin" className="hover:text-gray-300">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
   </>
  )
}

export default Footer