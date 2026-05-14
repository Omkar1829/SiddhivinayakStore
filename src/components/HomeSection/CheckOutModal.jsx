// components/CheckoutModal.jsx

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  XMarkIcon,
  CheckCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../../config/supabaseClient';

const CheckoutModal = ({ cartItems, total, onClose, setCartItems,
  orders,
  setOrders
 }) => {
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [customerData, setCustomerData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  // AUTO LOAD SAVED ADDRESS
  useEffect(() => {
    const savedCustomer = localStorage.getItem('customerData');

    if (savedCustomer) {
      setCustomerData(JSON.parse(savedCustomer));
    }
  }, []);

  // SAVE CUSTOMER DATA
  const handleInputChange = (e) => {
    const updatedData = {
      ...customerData,
      [e.target.name]: e.target.value,
    };

    setCustomerData(updatedData);

    localStorage.setItem(
      'customerData',
      JSON.stringify(updatedData)
    );
  };

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // PLACE ORDER
  const handlePlaceOrder = () => {
    setShowAddressForm(true);
  };

  // FINAL ORDER
//   const handleFinalOrder = () => {
//     if (
//       !customerData.fullName ||
//       !customerData.phone ||
//       !customerData.address
//     ) {
//       alert('Please fill all details');
//       return;
//     }

//     // WHATSAPP MESSAGE
//     const orderItems = cartItems
//       .map(
//         (item) =>
//           `• ${item.name} x ${item.quantity} = ₹${
//             item.price * item.quantity
//           }`
//       )
//       .join('%0A');

//     const message = `
// 🛒 *NEW ORDER*

// 👤 Name: ${customerData.fullName}
// 📞 Phone: ${customerData.phone}
// 🏠 Address: ${customerData.address}

// 📦 *Order Items:*
// ${orderItems}

// 💰 Total: ₹${total}

// 💳 Payment: ${
//       selectedPayment === 'cod'
//         ? 'Cash on Delivery'
//         : 'Online Payment'
//     }
// `;

//     // YOUR WHATSAPP NUMBER
//     const whatsappNumber = '917666726348';

//     window.open(
//       `https://wa.me/${whatsappNumber}?text=${message}`,
//       '_blank'
//     );
//   };

const handleFinalOrder = async () => {
  if (
    !customerData.fullName ||
    !customerData.phone ||
    !customerData.address
  ) {
    alert("Please fill all details");
    return;
  }

  try {

    // =========================
    // 1. SAVE ORDER
    // =========================

    const { data: orderData, error: orderError } =
      await supabase
        .from("orders")
        .insert([
          {
            customer_name: customerData.fullName,
            phone: customerData.phone,
            address: customerData.address,
            payment_method: selectedPayment,
            total_amount: total,
            status: "Pending",
            
          },
        ])
        .select();

    if (orderError) {
      console.error(orderError);
      alert("Failed to place order");
      return;
    }

    const orderId = orderData[0].id;

    // =========================
    // 2. SAVE ORDER ITEMS
    // =========================

    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
      product_image: item.image,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) {
      console.error(itemError);
      alert("Failed to save order items");
      return;
    }

    // =========================
    // 3. SAVE LOCALLY
    // =========================

    const newOrder = {
      id: orderId,
      items: cartItems,
      total,
      customer: customerData,
      paymentMethod: selectedPayment,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...orders];

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // =========================
    // 4. CLEAR CART
    // =========================

    setCartItems([]);

    localStorage.removeItem("cartItems");

    // =========================
    // 5. CLOSE MODAL
    // =========================

    onClose();

    toast.success("🎉 Order Placed Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  return (
    <div
      className="
        fixed inset-0 bg-black/70 backdrop-blur-sm
        z-[10000]
        flex items-start sm:items-center justify-center
        overflow-y-auto
        p-3 sm:p-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          sm:max-w-xl
          md:max-w-2xl
          lg:max-w-4xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl sm:rounded-3xl
          shadow-2xl
          border-4 border-emerald-400
          my-4
          animate-fadeIn
        "
      >
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-emerald-500 to-teal-600 p-5 sm:p-6 rounded-t-2xl sm:rounded-t-3xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">
                Checkout
              </h1>

              <p className="text-sm sm:text-lg opacity-90 mt-1">
                {itemCount} Items Added
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 overflow-x-hidden">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                flex flex-col sm:flex-row
                gap-4
                p-4 sm:p-5
                rounded-3xl
                bg-gray-50
                hover:bg-emerald-50
                transition-all
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full sm:w-28
                  h-48 sm:h-28
                  object-cover
                  rounded-2xl
                "
              />

              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {item.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 font-black text-xl">
                      ₹{item.price}
                    </p>

                    <p className="text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-gray-800">
                    ₹
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="px-4 sm:px-8">
          <div className="bg-emerald-50 rounded-3xl p-5 flex items-center justify-between">
            <span className="text-lg sm:text-2xl font-bold">
              Total Amount
            </span>

            <span className="text-2xl sm:text-4xl font-black text-emerald-600">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="p-4 sm:p-8">
          <h2 className="text-2xl font-black text-gray-800 mb-6">
            Select Payment Method
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* COD */}
            <button
              onClick={() => setSelectedPayment('cod')}
              className={`
                p-5 rounded-3xl border-2 transition-all duration-300
                ${
                  selectedPayment === 'cod'
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xl scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-emerald-400'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold">
                    💰 Cash on Delivery
                  </h3>

                  <p
                    className={`mt-1 ${
                      selectedPayment === 'cod'
                        ? 'text-white/90'
                        : 'text-gray-500'
                    }`}
                  >
                    Pay when order arrives
                  </p>
                </div>

                {selectedPayment === 'cod' && (
                  <CheckCircleIcon className="w-8 h-8" />
                )}
              </div>
            </button>

            {/* ONLINE */}
            <button
              onClick={() => setSelectedPayment('online')}
              className={`
                p-5 rounded-3xl border-2 transition-all duration-300
                ${
                  selectedPayment === 'online'
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xl scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-emerald-400'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold">
                    💳 Online Payment
                  </h3>

                  <p
                    className={`mt-1 ${
                      selectedPayment === 'online'
                        ? 'text-white/90'
                        : 'text-gray-500'
                    }`}
                  >
                    UPI / Cards / Wallet
                  </p>
                </div>

                {selectedPayment === 'online' && (
                  <CheckCircleIcon className="w-8 h-8" />
                )}
              </div>
            </button>
          </div>

          {/* PLACE ORDER BUTTON */}
          {!showAddressForm && (
            <button
              onClick={handlePlaceOrder}
              className="
                w-full mt-8
                bg-gradient-to-r from-emerald-500 to-teal-600
                text-white
                py-5
                rounded-3xl
                text-xl
                font-black
                shadow-2xl
                hover:scale-[1.01]
                transition-all
              "
            >
              🚀 Continue to Address
            </button>
          )}

          {/* ADDRESS FORM */}
          {showAddressForm && (
            <div className="mt-8 animate-fadeIn">
              <div className="bg-gray-50 rounded-3xl p-5 sm:p-8 border border-gray-200">
                <h2 className="text-2xl font-black text-gray-800 mb-6">
                  Delivery Details
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="font-bold text-gray-700 block mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={customerData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="
                        w-full p-4 rounded-2xl
                        border-2 border-gray-200
                        focus:border-emerald-500
                        outline-none
                      "
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="
                        w-full p-4 rounded-2xl
                        border-2 border-gray-200
                        focus:border-emerald-500
                        outline-none
                      "
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-2">
                      Home Address
                    </label>

                    <textarea
                      rows="4"
                      name="address"
                      value={customerData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full delivery address"
                      className="
                        w-full p-4 rounded-2xl
                        border-2 border-gray-200
                        focus:border-emerald-500
                        outline-none resize-none
                      "
                    />
                  </div>

                  {/* PAYMENT SUMMARY */}
                  <div className="bg-emerald-50 rounded-2xl p-4">
                    <p className="font-bold text-emerald-700">
                      Payment Method:
                    </p>

                    <p className="mt-2 text-lg font-semibold text-gray-700">
                      {selectedPayment === 'cod'
                        ? '💰 Cash on Delivery'
                        : '💳 Online Payment'}
                    </p>
                  </div>

                  {/* FINAL BUTTON */}
                  <button
                    onClick={handleFinalOrder}
                    className="
                      w-full
                      bg-gradient-to-r from-emerald-500 to-teal-600
                      text-white
                      py-5
                      rounded-3xl
                      text-xl
                      font-black
                      shadow-2xl
                      hover:scale-[1.01]
                      transition-all
                      flex items-center justify-center gap-3
                    "
                  >
                    <TruckIcon className="w-7 h-7" />
                    Place Final Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;