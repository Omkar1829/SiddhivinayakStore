import React from 'react';
import StoreInfoMini from '../HomeSection/StoreInfoMini';

const HomeTab = () => {
  return (
    <div className="space-y-20">
      {/* Featured Store Info */}
      {/* <StoreInfoMini /> */}
      
      {/* Featured Products */}
      <section>
        {/* <div className="text-center mb-16">
          <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6">
            🛒 Featured Products
          </h2>
          <p className="text-xl text-gray-600 font-semibold max-w-2xl mx-auto">
            Best selling items - Fresh & Quality Guaranteed!
          </p>
        </div>
        
        4 Featured Products
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: 1, name: 'Fresh Rice 5kg', price: 350, image: '🍚' },
            { id: 2, name: 'Dalda Oil 1L', price: 180, image: '🛢️' },
            { id: 3, name: 'Atta 5kg', price: 280, image: '🥛' },
            { id: 4, name: 'Sugar 5kg', price: 420, image: '🍚' }
          ].map((product) => (
            <div key={product.id} className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 cursor-pointer">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-300">
                <span className="text-4xl">{product.image}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{product.name}</h3>
              <div className="text-3xl font-black text-emerald-600 mb-6 text-center">₹{product.price}</div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                View All Products →
              </button>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
};

export default HomeTab;