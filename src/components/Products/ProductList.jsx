// components/ProductList.jsx
import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const ProductList = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});
  
  // const products = [
  //   {
  //     id: 1,
  //     name: "Aashirvaad Atta 5kg",
  //     price: 285,
  //     image: "https://picsum.photos/seed/atta/400/400",
  //     category: "Essentials",
  //     stock: 50
  //   },
  //   {
  //     id: 2,
  //     name: "Patanjali Doodh 1L",
  //     price: 65,
  //     image: "https://picsum.photos/seed/milk/400/400",
  //     category: "Dairy",
  //     stock: 30
  //   },
  //   {
  //     id: 3,
  //     name: "Surf Excel 2kg",
  //     price: 420,
  //     image: "https://picsum.photos/seed/detergent/400/400",
  //     category: "Cleaning",
  //     stock: 25
  //   },
  //   {
  //     id: 4,
  //     name: "Parle-G 800g",
  //     price: 95,
  //     image: "https://picsum.photos/seed/cookies/400/400",
  //     category: "Snacks",
  //     stock: 100
  //   },
  //   {
  //     id: 5,
  //     name: "Dabur Honey 500g",
  //     price: 225,
  //     image: "https://picsum.photos/seed/honey/400/400",
  //     category: "Health",
  //     stock: 40
  //   },
  //   {
  //     id: 6,
  //     name: "Lipton Green Tea 100g",
  //     price: 180,
  //     image: "https://picsum.photos/seed/tea/400/400",
  //     category: "Beverages",
  //     stock: 35
  //   }
  // ];

  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 0;
    if (qty > 0) {
      addToCart(product, qty);
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
      // IMMEDIATELY SHOW MINI CART WITH IMAGE
    // showMiniCart();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Fresh Products
        </h2>
        <span className="text-sm text-emerald-600 font-semibold bg-emerald-100 px-4 py-2 rounded-full">
          100+ Items Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-emerald-200"
          >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {product.stock}+ in stock
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-emerald-600">
                  ₹{product.price}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>⭐ 4.8</span>
                  <span>(127)</span>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-xl">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center hover:bg-emerald-50 transition-colors"
                    disabled={quantities[product.id] === 0}
                  >
                    <MinusIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantities[product.id] || 0}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!(quantities[product.id] > 0)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;