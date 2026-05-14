import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderTrackingModal from '../Modal/OrderTrackingModal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { supabase } from '../../config/supabaseClient';
import { ClipLoader } from "react-spinners";
const OrdersTab = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
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

    const filteredOrders = orders.filter(
  (order) =>
    order.status?.toLowerCase() !== 'cancelled'
);

const fetchOrders = async () => {

  setLoading(true);

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    setLoading(false);
    return;
  }

  setOrders(data || []);

  setLoading(false);
};

  const cancelOrder = (id) => {
    setPendingOrderId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!pendingOrderId) return;

    setIsProcessing(true);

    const { error } = await supabase
      .from('orders')
      .update({
        status: 'Cancelled',
      })
      .eq('id', pendingOrderId);

    setIsProcessing(false);
    setShowConfirmModal(false);
    setPendingOrderId(null);

    if (error) {
      toast.error('Failed to cancel order', {
        position: "top-center",
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

  const handleCancelModal = () => {
    setShowConfirmModal(false);
    setPendingOrderId(null);
  };

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center py-32">

      <ClipLoader
        color="#10b981"
        loading={loading}
        size={80}
      />

      <p className="mt-6 text-2xl font-bold text-emerald-600 animate-pulse">
        Loading Orders...
      </p>

    </div>
  );
}

if (filteredOrders.length === 0) {

  return (

    <div className="text-center py-20">

      <h2 className="text-4xl font-black text-gray-700">
        No Orders Yet
      </h2>

      <p className="mt-4 text-gray-500 text-lg">
        Your orders will appear here
      </p>

    </div>

  );

}

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Packing':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Out For Delivery':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="space-y-8">

{filteredOrders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-3xl shadow-xl p-6"
          >

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

              <div>
                <h2 className="text-2xl font-black">
                  OrderId: #{order.id}
                </h2>

                <p className="text-gray-500">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div
                className={
                  `inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs sm:text-sm md:text-base whitespace-nowrap min-w-fit ${getStatusBadgeClass(order.status)}`
                }
              >
                {order.status}
              </div>

            </div>

            <div className="space-y-4">

              {order.order_items?.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >

                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {item.product_name}
                    </h3>

                    <p>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-black">
                    ₹
                    {item.product_price *
                      item.quantity}
                  </div>

                </div>

              ))}

            </div>



            <div className="mt-6 flex justify-between gap-3">
              <div className='flex gap-5'>

              <button
                onClick={() =>
                  setSelectedOrder(order)
                }
                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold"
                >
                Track Order
              </button>

              {(order.status === 'Pending' ||
                order.status === 'Confirmed') && (
                  
                  <button
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                  className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                  Cancel Order
                </button>

)}
</div>

 <div>

    <p className="text-gray-500 font-medium">
      Total Amount
    </p>

    <h3 className="text-3xl font-black text-emerald-600">
      ₹{order.total_amount}
    </h3>

  </div>
            </div>

          </div>

        ))}

      {selectedOrder && (

        <OrderTrackingModal
          order={selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
        />

      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        confirmText="Yes"
        cancelText="Cancel"
        isLoading={isProcessing}
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModal}
      />

    </div>
  );
};

export default OrdersTab;