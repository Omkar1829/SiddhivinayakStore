// components/StoreInfo.jsx - FIXED VERSION
import React from 'react';
import { 
  StarIcon, 
  TruckIcon, 
  ClockIcon, 
  MapPinIcon, 
  PhoneIcon,
  TrophyIcon 
} from '@heroicons/react/24/outline';

const StoreInfo = () => {
  const storeInfo = {
    name: "SHRI SIDDHIVINAYAK TRADING",
    established: "2007",
    partners: ["YOGESH RAVINDRA WANI", "RAVINDRA VISHWANATH WANI"],
    workingPartners: ["YATISH RAVINDRA WANI", "MANAS YOGESH WANI"],
    address: "Shop No. 4, Uran Naka, Opp. Krishna Tower, Panvel – 410206",
    gstin: "27ABLFS6784R1ZV",
    license: "11514024002414",
    rating: 4.9,
    reviews: 1247,
    deliveryTime: "25-35 min",
    deliveryFee: "FREE",
    minOrder: "₹99"
  };

  const whyChooseUs = [
    "Premium-quality products, consistently delivered",
    "Seamless online + offline experience", 
    "Reliable and timely doorstep delivery",
    "Transparent pricing, no surprises",
    "A trusted neighborhood name since 2007"
  ];

  const commitments = [
    "Superior quality and freshness",
    "Thoughtfully selected products",
    "Transparent and fair pricing",
    "Personalized, attentive service"
  ];

  // Custom Trophy Icon Component
  const TrophyIcon = () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent)] animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Store Branding */}
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 animate-bounce-slow">
                <span className="text-4xl lg:text-5xl">🛍️</span>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent mb-2 tracking-tight">
                  {storeInfo.name}
                </h1>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-emerald-100 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-6 h-6 ${i < Math.floor(storeInfo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-emerald-100'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">({storeInfo.reviews})</span>
                  
                </div>
                
                <p className="text-lg font-semibold text-emerald-100 bg-white/10 px-4 py-2 rounded-full inline-block">
                  Established in {storeInfo.established}
                </p>
              </div>
            </div>

            {/* Partners */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center mr-3 text-xl font-bold">👥</span>
                Our Partners
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="font-semibold text-emerald-100 mb-2">Partners:</p>
                  {storeInfo.partners.map((partner, idx) => (
                    <p key={idx} className="text-white ml-4 bg-white/5 px-3 py-1 rounded-lg inline-block mb-1">
                      - {partner}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-emerald-100 mb-2">Working Partners:</p>
                  {storeInfo.workingPartners.map((partner, idx) => (
                    <p key={idx} className="text-white ml-4 bg-white/5 px-3 py-1 rounded-lg inline-block mb-1">
                      - {partner}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location & Legal */}
          <div className="text-center lg:text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center lg:justify-end mb-6">
                <MapPinIcon className="w-8 h-8 text-emerald-200 mr-3" />
                <h3 className="text-2xl font-bold text-white">Store Location</h3>
              </div>
              <p className="text-emerald-100 text-lg mb-6 leading-relaxed text-center lg:text-right bg-white/5 p-4 rounded-xl">
                {storeInfo.address}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-xl text-sm hover:bg-white/20 transition-all">
                  <span className="font-bold text-emerald-200 block mb-1">GSTIN:</span>
                  <span className="font-mono text-white bg-emerald-500/20 px-3 py-1 rounded-lg block">{storeInfo.gstin}</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-sm hover:bg-white/20 transition-all">
                  <span className="font-bold text-emerald-200 block mb-1">LICENSE:</span>
                  <span className="font-mono text-white bg-emerald-500/20 px-3 py-1 rounded-lg block">{storeInfo.license}</span>
                </div>
              </div>
              
              <button className="w-full bg-white text-emerald-700 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-white/50">
                📍 View on Map
              </button>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center">
            <span className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">📖</span>
            Our Story
          </h2>
          <p className="text-lg text-emerald-100 leading-relaxed max-w-4xl mx-auto mb-8 text-center">
            Established in 2007, <span className="font-bold text-white">{storeInfo.name}</span> was founded with a clear vision to bring refined quality, 
            trusted sourcing, and an elevated grocery experience to everyday living. From a modest neighborhood outlet, we've evolved into a 
            distinguished name in grocery retail, built on integrity, consistency, and customer trust.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-400/20 to-teal-400/20 border-l-4 border-emerald-400 p-6 rounded-r-2xl">
            <p className="text-emerald-100 text-center italic font-semibold text-xl">
              "Over a decade curating fresh produce, premium essentials, and trusted household products for modern families."
            </p>
          </div>
        </div>

        {/* Commitments & Why Choose Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Commitments */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center group-hover:text-emerald-100 transition-colors">
              <TrophyIcon />
              <span className="ml-3">Our Commitment</span>
            </h3>
            <ul className="space-y-3">
              {commitments.map((commitment, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-emerald-100 group-hover:text-emerald-50 transition-colors">
                  <span className="text-2xl mt-1 font-bold text-yellow-400">✓</span>
                  <span className="flex-1">{commitment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center group-hover:text-emerald-100 transition-colors">
              <StarIcon className="w-10 h-10 text-yellow-400" />
              <span className="ml-3">Why Choose Us</span>
            </h3>
            <ul className="space-y-3">
              {whyChooseUs.map((reason, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-emerald-100 group-hover:text-emerald-50 transition-colors">
                  <span className="text-2xl mt-1 font-bold">⭐</span>
                  <span className="flex-1">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-12 border-t-4 border-white/20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 animate-pulse">
              🛒 Order Now
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Experience grocery shopping without stepping out. 
              <br className="hidden lg:inline" />
              <span className="font-bold text-white block mt-2 text-2xl">Fresh. Fast. Reliable. Delivered.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="flex-1 max-w-md bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-5 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:from-green-600 hover:to-emerald-700 transition-all duration-500 transform hover:scale-105 text-lg border-4 border-white/20 group">
                <PhoneIcon className="w-7 h-7 mr-3 inline group-hover:animate-bounce" />
                Order via WhatsApp
              </button>
              <button className="flex-1 max-w-md bg-white text-emerald-700 font-bold py-5 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:bg-emerald-50 transition-all duration-500 transform hover:scale-105 text-lg border-4 border-emerald-500/50">
                🛒 Shop Online Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <TruckIcon className="w-12 h-12 text-emerald-300 mb-3 animate-pulse" />
                <p className="font-bold text-white text-lg">{storeInfo.deliveryTime}</p>
                <p className="text-emerald-100 text-sm">{storeInfo.deliveryFee} delivery</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <ClockIcon className="w-12 h-12 text-yellow-400 mb-3" />
                <p className="font-bold text-white text-lg">Min Order</p>
                <p className="text-emerald-100 text-sm">₹{storeInfo.minOrder}</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <TrophyIcon />
                <p className="font-bold text-white text-lg">Trusted Since</p>
                <p className="text-emerald-100 text-sm">{storeInfo.established}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;