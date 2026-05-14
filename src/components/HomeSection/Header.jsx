// components/Header.jsx - MINI PREVIEW + FULL DROPDOWN
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MinusIcon, 
  PlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../config/supabaseClient';



const Header = ({ cartItems, updateQuantity, showMiniCartPreview, proceedToCheckout, isMiniCartVisible, showAddToCartPopup,  products, setActiveTab, setSelectedCategory,  searchTerm,
  setSearchTerm,
  setSelectedProductId }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const cartRef = useRef(null);
  const previewTimeoutRef = useRef(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // NEW
  const [user, setUser] = useState(null);
const [showAuthModal, setShowAuthModal] = useState(false);
const [phone, setPhone] = useState("");
const [otp, setOtp] = useState("");
const [showOtpInput, setShowOtpInput] = useState(false);
const [searchResults, setSearchResults] = useState([]);
const [showSearchDropdown, setShowSearchDropdown] = useState(false);

const searchRef = useRef(null);

const [searchHistory, setSearchHistory] = useState(() => {
  const saved =
    localStorage.getItem("searchHistory");

  return saved
    ? JSON.parse(saved)
    : [];
});

useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {

      setShowSearchDropdown(false);

    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);

useEffect(() => {

  if (!searchTerm.trim()) {
    setSearchResults([]);
    return;
  }

  const filtered =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  setSearchResults(filtered);

}, [searchTerm, products]);

useEffect(() => {

  if (!searchTerm.trim()) {
    setSearchResults([]);
    return;
  }

  const filtered =
products.filter(product =>
  product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.subcategory?.toLowerCase().includes(searchTerm.toLowerCase())
)
  setSearchResults(filtered);

}, [searchTerm, products]);

const saveSearchHistory = (term) => {

  let history =
    JSON.parse(
      localStorage.getItem("searchHistory")
    ) || [];

  history = history.filter(
    (item) => item !== term
  );

  history.unshift(term);

  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  localStorage.setItem(
    "searchHistory",
    JSON.stringify(history)
  );

  setSearchHistory(history);
};

const handleSearchProductClick = (
  product
) => {

  saveSearchHistory(product.name);

  setSearchTerm(product.name);

  setShowSearchDropdown(false);

  setActiveTab("products");

  setSelectedCategory(product.category);

  setSelectedProductId(product.id);

  setTimeout(() => {

    const element =
      document.getElementById(
        `product-${product.id}`
      );

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add(
        "ring-4",
        "ring-emerald-400"
      );

      setTimeout(() => {
        element.classList.remove(
          "ring-4",
          "ring-emerald-400"
        );
      }, 2000);

    }

  }, 700);
};

useEffect(() => {

  // GET CURRENT USER
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  // LISTEN LOGIN LOGOUT
  const {
    data: authListener
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null);
    }
  );

  return () => {
    authListener.subscription.unsubscribe();
  };

}, []);


    useEffect(() => {
    if (isMiniCartVisible) {
      showMiniCartPreview();
    }
  }, [isMiniCartVisible]);

  // Show mini preview on hover
  const handleMouseEnter = () => {
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    if (cartItems.length > 0) {
      setShowMiniPreview(true);
    }
  };

  const handleMouseLeave = () => {
    previewTimeoutRef.current = setTimeout(() => {
      setShowMiniPreview(false);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCart = (e) => {
    e.stopPropagation();
    setIsCartOpen(!isCartOpen);
    setShowMiniPreview(false);
  };

  const sendOtp = async () => {

  const { error } =
    await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("OTP Sent");

  setShowOtpInput(true);
};

const verifyOtp = async () => {

  const { error } =
    await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otp,
      type: "sms",
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login Success");

  setShowAuthModal(false);
};

const logout = async () => {
  await supabase.auth.signOut();
};

  const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartItemCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = (itemId) => updateQuantity(itemId, 0);

  

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">🛒</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Shri Siddhivinayak Trading
              </h1>
              <p className="text-xs text-emerald-600 font-bold">30 Min • Panvel</p>
            </div>
          </div>

          {/* Right Section */}
          {/* SEARCH BAR */}
<div ref={searchRef} className="relative w-[420px] hidden lg:block">

  <input
      type="text"
  placeholder="Search products..."
  value={searchTerm}
  onFocus={() =>
    setShowSearchDropdown(true)
  }
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setShowSearchDropdown(true);
  }}
    className="
      w-full
      bg-gray-100
      border
      border-gray-200
      rounded-2xl
      py-3
      px-5
      outline-none
      focus:border-emerald-500
      focus:bg-white
      transition-all
    "
  />

  {/* SEARCH DROPDOWN */}
  {showSearchDropdown && (

    <div
      className="
        absolute
        top-16
        left-0
        w-full
        bg-white
        rounded-3xl
        shadow-2xl  
        border
        border-gray-100
        overflow-hidden
        z-[999]
      "
    >

      {/* HISTORY */}
     {showSearchDropdown &&
  !searchTerm &&
  searchHistory.length > 0 && (

        <div className="p-4">

          <h3
            className="
              text-sm
              font-bold
              text-gray-500
              mb-3
            "
          >
            Recent Searches
          </h3>

          <div className="space-y-2">

            {searchHistory.map((item, index) => (

              <button
                key={index}
                onClick={() =>
                  setSearchTerm(item)
                }
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-xl
                  hover:bg-emerald-50
                  transition-all
                "
              >
                🔍 {item}
              </button>

            ))}

          </div>

        </div>

      )}

      {/* PRODUCTS */}
      {searchResults.length > 0 && (

        <div className="max-h-[400px] overflow-y-auto">

          {searchResults.map((product) => (

            <button
              key={product.id}
              onClick={() =>
                handleSearchProductClick(
                  product
                )
              }
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                hover:bg-emerald-50
                transition-all
                border-b
              "
            >

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/80"
                }
                alt={product.name}
                className="
                  w-14
                  h-14
                  rounded-xl
                  object-cover
                "
              />

              <div className="text-left">

                <h3
                  className="
                    font-semibold
                    text-gray-800
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    text-emerald-600
                    font-bold
                  "
                >
                  ₹{product.price}
                </p>

              </div>

            </button>

          ))}

        </div>

      )}

      {/* EMPTY */}
      {searchTerm &&
        searchResults.length === 0 && (

        <div
          className="
            p-8
            text-center
            text-gray-500
          "
        >
          No products found
        </div>

      )}

    </div>

  )}

</div>

          <div className="flex items-center space-x-4">
            {/* AUTH MODAL */}
{showAuthModal && (

  <div
    className="
      fixed inset-0
      bg-black/40
      backdrop-blur-sm
      flex items-center justify-center
      z-[999]
    "
  >

    <div
      className="
        w-[95%] max-w-md
        bg-white
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

      <h2 className="text-3xl font-black mb-6 text-center text-emerald-600">
        Login
      </h2>

      {/* PHONE */}
      <input
        type="number"
        placeholder="Enter Mobile Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="
          w-full
          border-2
          border-gray-200
          rounded-2xl
          p-4
          mb-4
          outline-none
          focus:border-emerald-500
        "
      />

      {/* OTP */}
      {showOtpInput && (

        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="
            w-full
            border-2
            border-gray-200
            rounded-2xl
            p-4
            mb-4
            outline-none
            focus:border-emerald-500
          "
        />

      )}

      {/* BUTTON */}
      {!showOtpInput ? (

        <button
          onClick={sendOtp}
          className="
            w-full
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            py-4
            rounded-2xl
            font-bold
          "
        >
          Send OTP
        </button>

      ) : (

        <button
          onClick={verifyOtp}
          className="
            w-full
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            py-4
            rounded-2xl
            font-bold
          "
        >
          Verify OTP
        </button>

      )}

    </div>

  </div>

)}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer transition-all">
              <MapPinIcon className="w-5 h-5" />
              <span>Panvel</span>
            </div>


            {/* CART WITH MINI PREVIEW */}
            <div 
              className="relative group" 
              ref={cartRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* Main Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 
                           hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl 
                           hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 
                           focus:outline-none focus:ring-4 focus:ring-emerald-300 z-10"
              >
                <ShoppingCartIcon className="w-7 h-7" />
                
                {/* Cart Count Badge */}
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 text-white text-xs 
                                  rounded-full flex items-center justify-center font-bold 
                                  shadow-lg border-2 border-white animate-bounce">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {/* MINI CART PREVIEW - BOTTOM POPUP */}
              {showMiniPreview && cartItems.length > 0 && (
                <div className="absolute bottom-30 right-0 w-80 bg-white rounded-3xl shadow-2xl 
                               border border-gray-100 p-4 z-40 animate-slideUp pointer-events-none
                               group-hover:pointer-events-auto">
                  
                  {/* Mini Preview Header */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <ShoppingCartIcon className="w-5 h-5 text-emerald-500" />
                      <span className="font-semibold text-gray-900 text-sm">Quick View</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold">
                      {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Recent Items (Max 3) */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {cartItems.slice(-3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <img 
                          src={item.image && item.image.startsWith('http')
                            ? item.image
                            : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-emerald-600 font-bold">₹{item.price}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mini Total */}
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-emerald-600 text-base">
                        ₹{getCartTotal().toLocaleString()}
                      </span>
                    </div>
                    <button 
                      onClick={toggleCart}
                      className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                                 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-lg 
                                 hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 
                                 transition-all duration-300 pointer-events-auto"
                    >
                      View Full Cart
                    </button>
                  </div>
                </div>
              )}

              {/* FULL CART DROPDOWN */}
              {isCartOpen && (
                <div className="absolute top-16 -right-2 w-85 bg-white rounded-3xl shadow-2xl 
                               border border-gray-100 overflow-hidden z-50 animate-slideDown">
                  
                  {/* Full Cart Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-xl font-bold">Your Cart</h3>
                        <p className="text-sm opacity-90">{cartItems.length} items</p>
                      </div>
                      <button onClick={toggleCart} className="p-1.5 rounded-xl hover:bg-white/20">
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Full Cart Items */}
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-5 border-b border-gray-50 hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image && item.image.startsWith('http')
                              ? item.image
                              : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h5>
                            <p className="text-emerald-600 font-bold">₹{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded-lg text-gray-600 hover:text-emerald-600"
                              >
                                <MinusIcon className="w-5 h-5" />
                              </button>
                              <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded-lg text-gray-600 hover:text-emerald-600"
                              >
                                <PlusIcon className="w-5 h-5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl hover:rotate-90 transition-all"
                            >
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout */}
                  {cartItems.length > 0 && (
                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-2xl font-black text-emerald-600">₹{getCartTotal().toLocaleString()}</span>
                      </div>
<button 
  onClick={proceedToCheckout}  // ← YE ADD KARO
  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
>
  Proceed to Checkout →
</button>
                    </div>
                  )}
                </div>
              )}
              
            </div>
            
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;