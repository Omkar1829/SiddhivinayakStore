import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../config/supabaseClient';
import OrderTrackingModal from '../Modal/OrderTrackingModal';
import ConfirmationModal from '../Modal/ConfirmationModal';

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =
    useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {

    fetchOrders();

    // REALTIME
    const channel = supabase
      .channel('orders-live')

      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },

        () => {
          fetchOrders();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);



  // FETCH ORDERS + ITEMS
  const fetchOrders = async () => {

    const { data, error } = await supabase
      .from('orders')

      .select(`
        *,
        order_items (*)
      `)

      .order('created_at', {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  };

  // CANCEL ORDER
  const cancelOrder = async (id) => {

    const confirmCancel =
      window.confirm(
        'Cancel this order?'
      );

    if (!confirmCancel) return;

    const { error } = await supabase
      .from('orders')

      .update({
        status: 'Cancelled',
      })

      .eq('id', id);

    if (error) {
      toast.error('Failed to cancel order', {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    toast.success('Order cancelled successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    fetchOrders();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">

      <h1 className="text-4xl font-black mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders
          .filter(
            (order) =>
              order.status !== 'Cancelled'
          )

          .map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">

                <div>
                  <h2 className="text-lg sm:text-2xl font-black">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    {new Date(
                      order.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`
                    px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-white text-sm sm:text-base whitespace-nowrap

                    ${
                      order.status === 'Pending'
                        ? 'bg-yellow-500'
                        : order.status === 'Confirmed'
                        ? 'bg-blue-500'
                        : order.status === 'Packing'
                        ? 'bg-purple-500'
                        : order.status ===
                          'Out For Delivery'
                        ? 'bg-orange-500'
                        : 'bg-emerald-500'
                    }
                  `}
                >
                  {order.status}
                </div>

              </div>

              {/* ITEMS */}
              <div className="space-y-4">

                {order.order_items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4 items-center"
                  >

                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {item.product_name}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <div className="font-black text-xl">
                      ₹
                      {item.product_price *
                        item.quantity}
                    </div>

                  </div>

                ))}

              </div>

              {/* FOOTER */}
              <div className="mt-6 pt-6 border-t flex justify-between items-center">

                <h3 className="text-3xl font-black">
                  ₹{order.total_amount}
                </h3>

                <div className="flex gap-3">

                  {/* TRACK */}
                  <button
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                    className="
                      bg-emerald-500
                      text-white
                      px-6 py-3
                      rounded-2xl
                      font-bold
                    "
                  >
                    Track Order
                  </button>

                  {/* CANCEL */}
                  {(order.status === 'Pending' ||
                    order.status ===
                      'Confirmed') && (

                    <button
                      onClick={() =>
                        cancelOrder(order.id)
                      }
                      className="
                        bg-red-500
                        text-white
                        px-6 py-3
                        rounded-2xl
                        font-bold
                      "
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}

      </div>

      

      {/* TRACKING MODAL */}
      {selectedOrder && (

        <OrderTrackingModal
          order={selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
        />

      )}

    </div>
  );
};

export default MyOrders;