// components/Cart.jsx
import React from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';



const Cart = ({ cartItems, updateQuantity, proceedToCheckout  }) => {
  // // const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // // console.log(cartItems)

  // // return (
  // //   <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-emerald-100 p-8">
  // //     <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
  // //       🛒 Your Cart
  // //       <span className="ml-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
  // //         {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
  // //       </span>
  // //     </h3> 

  // //      <div className="space-y-4 mb-8">
  // //       {cartItems.map(item => (
  // //         <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
  // //           <img
  // //             src={item.image && item.image.startsWith('http')
  // //               ? item.image
  // //               : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`}
  // //             alt={item.name}
  // //             className="w-20 h-20 object-cover rounded-xl shadow-md"
  // //           />
  // //           <div className="flex-1 min-w-0">
  // //             <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
  // //             <p className="text-emerald-600 font-bold text-lg">₹{item.price}</p>
  // //           </div>
  // //           <div className="flex items-center space-x-3">
  // //             <div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-sm">
  // //               <button
  // //                 onClick={() => updateQuantity(item.id, -1)}
  // //                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
  // //               >
  // //                 <XMarkIcon className="w-5 h-5 text-gray-600" />
  // //               </button>
  // //               <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
  // //               <button
  // //                 onClick={() => updateQuantity(item.id, 1)}
  // //                 className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition-all hover:scale-105"
  // //               >
  // //                 +
  // //               </button>
  // //             </div>
  // //             <button
  // //               onClick={() => updateQuantity(item.id, 0)}
  // //               className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
  // //             >
  // //               <TrashIcon className="w-6 h-6" />
  // //             </button>
  // //           </div>
  // //         </div>
  // //       ))}
  // //     </div> 

  // //      <div className="border-t border-gray-200 pt-6">
  // //       <div className="flex justify-between items-center text-2xl font-bold mb-6">
  // //         <span>Total:</span>
  // //         <span className="text-emerald-600">₹{total}</span>
  // //       </div>
  // //       <button onClick={proceedToCheckout } className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-lg">
  // //         Proceed to Checkout
  // //       </button>
  // //     </div>
  // //   </div>
  // );
};

export default Cart;