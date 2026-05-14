// App.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/HomeSection/Header';
import StoreInfo from './components/HomeSection/StoreInfo';
import ProductList from './components/Products/ProductList';
import Cart from './components/HomeSection/Cart';
import HomeTab from './components/Tabs/HomeTab';
import AboutTab from './components/Tabs/AboutTab';
import ProductsTab from './components/Tabs/ProductTab';
import CheckoutModal from './components/HomeSection/CheckOutModal';
import OrdersTab from './components/Tabs/OrderTab';
import AddProduct from './components/admin/AddProduct';
import { supabase } from './config/supabaseClient';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false); // NEW LINE
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState(null);
const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});
const [orders, setOrders] = useState(() => {
  const savedOrders = localStorage.getItem("orders");
  return savedOrders ? JSON.parse(savedOrders) : [];
});

useEffect(() => {
  localStorage.setItem("orders", JSON.stringify(orders));
}, [orders]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${product.name} added to cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setShowAddToCartPopup(true);
    setTimeout(() => setShowAddToCartPopup(false), 4000); // 4 sec auto hide
  };

  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

  // const updateQuantity = (id, quantity) => {
  //   if (quantity <= 0) {
  //     setCartItems(cartItems.filter(item => item.id !== id));
  //   } else {
  //     setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
  //   }
  // };

//   const updateQuantity = (id, change) => {
//   setCartItems(prev =>
//     prev
//       .map(item =>
//         item.id === id
//           ? { ...item, quantity: item.quantity + change }
//           : item
//       )
//       .filter(item => item.quantity > 0)
//   );
// };

useEffect(() => {

  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data);
  };

  fetchProducts();

}, []);

const updateQuantity = (id, change) => {

  setCartItems((prevItems) => {

    return prevItems
      .map((item) => {

        if (item.id === id) {

          // REMOVE PRODUCT
          if (change === 0) {
            return null;
          }

          return {
            ...item,
            quantity: item.quantity + change,
          };
        }

        return item;
      })

      // REMOVE NULL + QTY <= 0
      .filter(
        (item) =>
          item !== null &&
          item.quantity > 0
      );
  });
};

  const proceedToCheckout = () => {
  setShowCheckoutModal(true);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* <ToastContainer /> */}
      <Header  
      cartItems={cartItems} 
        updateQuantity={updateQuantity}
        showAddToCartPopup={showAddToCartPopup}
        proceedToCheckout={proceedToCheckout}
          products={products}
  setActiveTab={setActiveTab}
  setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
    setSelectedProductId={setSelectedProductId}

        />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center lg:justify-center gap-2 mb-16 ">
          {[
            // { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'about', label: 'About Us', icon: '👨‍💼' },
            { id: 'products', label: 'Products', icon: '🛒' },
            { id: 'orders', label: 'My Orders', icon: '📦' },
            { id: 'admin', label: 'Admin', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-2xl scale-105'
                  : 'bg-white/50 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 hover:shadow-lg hover:scale-105'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[60vh]">
          {/* {activeTab === 'home' && <HomeTab />} */}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'products' &&<ProductsTab
          
  addToCart={addToCart}
  cartItems={cartItems}
  updateQuantity={updateQuantity}
    products={products}
  setProducts={setProducts}
    searchTerm={searchTerm}
      selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedProductId={selectedProductId}

/>}
{activeTab === 'orders' && (
  <OrdersTab orders={orders} setOrders={setOrders}/>
)}
{activeTab === 'admin' && (
  <AddProduct />
)}
        </div>
      </main>

      {/* Sticky Cart */}
      <Cart cartItems={cartItems} updateQuantity={updateQuantity} proceedToCheckout={proceedToCheckout} />
{showCheckoutModal && (
  // <CheckoutModal
  //   cartItems={cartItems}
  //   total={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
  //   onClose={() => setShowCheckoutModal(false)}
  // />
  <CheckoutModal
  cartItems={cartItems}
  total={cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )}
  onClose={() => setShowCheckoutModal(false)}
  setCartItems={setCartItems}
  orders={orders}
  setOrders={setOrders}
/>
)}
    </div>
  );
}

export default App;