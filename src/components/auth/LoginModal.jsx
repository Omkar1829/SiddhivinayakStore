// src/components/Auth/LoginModal.jsx

import React, { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

const LoginModal = ({
  isOpen,
  onClose,
}) => {

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  // SEND OTP
  const sendOTP = async () => {

    if (!phone) {
      alert("Enter phone number");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setStep(2);
  };

  // VERIFY OTP
  const verifyOTP = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: "sms",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful");

    onClose();
  };

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        p-4
      "
    >

      {/* MODAL */}
      <div
        className="
          w-full max-w-md
          bg-white
          rounded-[32px]
          shadow-2xl
          overflow-hidden
          animate-[fadeIn_.3s_ease]
        "
      >

        {/* TOP */}
        <div
          className="
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            p-6
            text-white
            relative
          "
        >

          <button
            onClick={onClose}
            className="
              absolute top-5 right-5
              w-10 h-10
              rounded-full
              bg-white/20
              flex items-center justify-center
            "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-black">
            Welcome 👋
          </h2>

          <p className="mt-2 text-white/80">
            Login to continue shopping
          </p>

        </div>

        {/* BODY */}
        <div className="p-8">

          {step === 1 ? (

            <>
              <label className="text-sm font-bold text-gray-600">
                Mobile Number
              </label>

              <div
                className="
                  mt-2
                  flex items-center
                  border-2 border-gray-200
                  rounded-2xl
                  overflow-hidden
                  focus-within:border-emerald-500
                "
              >

                <div
                  className="
                    px-4 py-4
                    bg-gray-100
                    font-bold
                    text-gray-700
                  "
                >
                  +91
                </div>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="
                    w-full
                    px-4 py-4
                    outline-none
                    text-lg
                  "
                />

              </div>

              <button
                onClick={sendOTP}
                disabled={loading}
                className="
                  mt-8
                  w-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-600
                  hover:from-emerald-600
                  hover:to-green-700
                  text-white
                  font-bold
                  py-4
                  rounded-2xl
                  shadow-xl
                  transition-all
                "
              >

                {loading
                  ? "Sending OTP..."
                  : "Continue"}

              </button>
            </>

          ) : (

            <>
              <label className="text-sm font-bold text-gray-600">
                Enter OTP
              </label>

              <input
                type="text"
                placeholder="6 Digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  border-2 border-gray-200
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  text-2xl
                  tracking-[10px]
                  text-center
                  focus:border-emerald-500
                "
              />

              <button
                onClick={verifyOTP}
                disabled={loading}
                className="
                  mt-8
                  w-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-600
                  hover:from-emerald-600
                  hover:to-green-700
                  text-white
                  font-bold
                  py-4
                  rounded-2xl
                  shadow-xl
                  transition-all
                "
              >

                {loading
                  ? "Verifying..."
                  : "Verify OTP"}

              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default LoginModal;