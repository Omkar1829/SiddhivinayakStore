// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-to-r from-gray-900 to-emerald-900 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mr-4">🛒</span>
              Kirana Express
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted neighborhood store. Fresh products delivered in 30 minutes!
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg">📱</a>
              <a href="#" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg">📧</a>
            </div>
            <p className="text-sm text-gray-400">© 2024 Kirana Express. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;