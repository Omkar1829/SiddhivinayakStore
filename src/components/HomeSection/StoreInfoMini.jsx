import React from 'react';

const StoreInfoMini = () => {
  return (
    <section className="text-center">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-4xl shadow-2xl p-12 border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-8 leading-tight">
          SHRI SIDDHIVINAYAK
          <br />
          <span className="text-4xl md:text-5xl">TRADING</span>
        </h2>
        <p className="text-2xl text-gray-700 mb-12 font-semibold max-w-2xl mx-auto leading-relaxed">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-xl">
            🛒 Shop Now
          </a>
          <button className="border-2 border-emerald-500 text-emerald-500 font-bold py-4 px-12 rounded-3xl hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:shadow-xl text-xl">
            📱 WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreInfoMini;