import React from 'react';

const OrderTrackingModal = ({ order, onClose }) => {

const steps = [
  "Pending",
  "Confirmed",
  "Packing",
  "Out For Delivery",
  "Delivered"
];

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="fixed inset-0 bg-black/60 z-[10000] flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">
            Track Order
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">

          {steps.map((step, index) => (

            <div
              key={step}
              className="flex items-center gap-4"
            >

              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                  ${
                    index <= currentStep
                      ? 'bg-emerald-500'
                      : 'bg-gray-300'
                  }
                `}
              >
                ✓
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {step}
                </h3>

                {index === currentStep && (
                  <p className="text-emerald-600 font-semibold">
                    Current Status
                  </p>
                )}
              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default OrderTrackingModal;