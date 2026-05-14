import React from 'react';
import ProductsTab from './ProductTab';
import { PhoneIcon } from '@heroicons/react/24/outline';

const AboutTab = () => {


  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6 leading-tight">
          About Shri Siddhivinayak Trading
        </h1>
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-3xl shadow-lg">
          🎉 Established 2007 - Panvel's Trusted Name
        </div>
      </div>

      {/* Full Story */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-4xl p-5 sm:p-8 md:p-12 shadow-2xl border border-white/50">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 font-medium text-center max-w-3xl mx-auto">
          Established in 2007, <strong>SHRI SIDDHIVINAYAK TRADING</strong> was founded with a clear vision to bring refined quality, trusted sourcing, and an elevated grocery experience to everyday living.
        </p>
        <p className="text-xl text-gray-700 leading-relaxed mb-12 font-medium text-center max-w-3xl mx-auto">
          The store has evolved from a modest neighborhood outlet into a distinguished name in grocery retail, 
          built on a foundation of integrity, consistency, and customer trust.
        </p>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Leadership</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-emerald-50 rounded-3xl border-l-4 border-emerald-400">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">👨‍💼</div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">Partners</h4>
                  <p className="text-emerald-700 font-semibold">YOGESH RAVINDRA WANI</p>
                  <p className="text-emerald-700 font-semibold">RAVINDRA VISHWANATH WANI</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-green-50 rounded-3xl border-l-4 border-green-400">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">🤝</div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">Working Partners</h4>
                  <p className="text-green-700 font-semibold">YATISH RAVINDRA WANI</p>
                  <p className="text-green-700 font-semibold">MANAS YOGESH WANI</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-4xl border border-blue-200">
            <div className="text-4xl mb-6">📍</div>
            <h3 className="font-bold text-2xl text-gray-800 mb-6">Our Location</h3>
            <div className="space-y-3 text-lg font-semibold text-gray-700">
              <p>🛒 Shop No. 4, Uran Naka</p>
              <p>🏢 Opp. Krishna Tower</p>
              <p>📬 Panvel – 410206</p>
            </div>
            <div className="mt-8 p-6 bg-white rounded-3xl shadow-md">
              <p className="font-bold text-sm text-emerald-600 mb-2">✅ Legal Details</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <code>GSTIN: 27ABLFS6784R1ZV</code>
                <code>LICENSE: 11514024002414</code>
              </div>
            </div>
          </div>
        </div>
        
<p className="text-xl text-gray-700 leading-relaxed mb-12 font-medium text-center max-w-3xl mx-auto">
  We have spent over a decade curating a selection of fresh produce, premium essentials, and trusted household products, 
  tailored to meet the expectations of modern families.
</p>

        {/* Commitments */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-left">
  Our journey is defined by an unwavering commitment to:
</h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {[
            "Superior quality and freshness",
            "Thoughtfully selected products",
            "Transparent and fair pricing",
            "Personalized, attentive service"
          ].map((commitment, index) => (
            <div key={index} className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border border-emerald-200 hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold mb-6 group-hover:rotate-12 transition-all duration-300">
                {index + 1}
              </div>
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">{commitment}</p>
            </div>
          ))}
        </div>

<p className="text-xl text-gray-700 leading-relaxed mb-12 font-medium text-center max-w-3xl mx-auto p-5">
  We have spent over a decade curating a selection of fresh produce, premium essentials, and trusted household products, 
  tailored to meet the expectations of modern families.
</p>

        {/* Why Choose Us */}
        <div className="mt-16 mb-16 p-12 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-4xl text-center">
          <h2 className="text-4xl font-black mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Premium-quality products",
              "Seamless online + offline experience",
              "Reliable doorstep delivery",
              "Transparent pricing, no surprises",
              "Trusted neighborhood name since 2007"
            ].map((reason, index) => (
              <div key={index} className="p-6 bg-white/20 backdrop-blur-xl rounded-3xl hover:bg-white/30 transition-all duration-300">
                <span className="text-3xl mb-4 block">⭐</span>
                <p className="font-bold text-xl">{reason}</p>
              </div>
            ))}
          </div>
        </div>
            <div className="max-w-4xl mx-auto  hover:shadow-3xl transition-all duration-500 ">
      
        <p className="text-2xl text-gray-700 mb-12 font-bold max-w-2xl mx-auto leading-relaxed text-center" >
          Premium Groceries | Trusted Since 2007 | Panvel
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">Free Delivery</h4>
            <p className="text-emerald-600 font-semibold">Panvel Area</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-4">⭐</div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">100% Fresh</h4>
            <p className="text-emerald-600 font-semibold">Daily Stock</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">Fast Service</h4>
            <p className="text-emerald-600 font-semibold">30 Mins Delivery</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
         <a
  href="tel:+917666726348"
  className="w-full sm:w-auto border-2 border-emerald-500 text-emerald-500 font-bold py-3 md:py-4 px-8 md:px-12 rounded-3xl hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:shadow-xl text-base md:text-xl flex items-center justify-center"
>
  <PhoneIcon className="w-7 h-7 mr-3" />
  Call Now
</a>
        <a
  href="https://wa.me/917666726348?text=Hello%20Shri%20Siddhivinayak%20Trading"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full sm:w-auto border-2 border-emerald-500 text-emerald-500 font-bold py-3 md:py-4 px-8 md:px-12 rounded-3xl hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:shadow-xl text-base md:text-xl flex items-center justify-center"
>
  📱 WhatsApp
</a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutTab;