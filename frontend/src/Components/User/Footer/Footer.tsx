import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <div className="bg-[#0C3661] text-white px-6 py-10 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Contact Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold">GET IN TOUCH</h1>
          
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 p-2 rounded-full">
              <span role="img" aria-label="phone">📞</span>
            </div>
            <div>
              <span className="text-sm">Hotline</span>
              <p className="font-medium">+97143266333</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-700 p-2 rounded-full">
              <span role="img" aria-label="email">📧</span>
            </div>
            <div>
              <span className="text-sm">Email</span>
              <p className="font-medium">info@crystalcorp.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-gray-700 p-2 rounded-full">
              <span role="img" aria-label="location">📍</span>
            </div>
            <div>
              <span className="text-sm">Address</span>
              <p className="font-medium">
                Crystal Corporation LLC, 32St, Ras AI Khor Industrial Area 2,<br />
                Dubai, PO Box 5277
              </p>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">COMPANY</h1>
          <a href="#" className="hover:text-gray-400">About Us</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
          <a href="#" className="hover:text-gray-400">All Products</a>
          <a href="#" className="hover:text-gray-400">My Account</a>
          <a href="#" className="hover:text-gray-400">Return & Refund Policy</a>
        </div>

        {/* Our Products Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">OUR PRODUCTS</h1>
          <a href="#" className="hover:text-gray-400">Crystal</a>
          <a href="#" className="hover:text-gray-400">Keychain</a>
          <a href="#" className="hover:text-gray-400">Necklace</a>
          <a href="#" className="hover:text-gray-400">Base</a>
        </div>

        {/* Logo & Social Media */}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <img 
            className="w-[120px]" 
            src="https://crystalcorp.com/my3dpic/wp-content/uploads/2023/12/logo.png" 
            alt="Crystal Corp Logo"
          />
          <h1 className="text-lg font-semibold">FOLLOW US</h1>
          <div className="flex gap-3">
            <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Crystal Corporation LLC. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
