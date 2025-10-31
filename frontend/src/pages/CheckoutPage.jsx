import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    promoCode: "",
    agree: false,
  });

  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const booking = state || {};
  const subtotal = booking.pricePerPerson * booking.quantity;
  const taxes = Math.round(subtotal * 0.06);
  const totalBeforeDiscount = subtotal + taxes;
  const total = Math.max(totalBeforeDiscount - discount, 0);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      errors.fullName = "Full name should contain only letters.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Enter a valid email address.";
    }

    if (formData.promoCode && formData.promoCode.length < 3) {
      errors.promoCode = "Promo code should be at least 3 characters.";
    }

    if (!formData.agree) {
      errors.agree = "Please agree to the terms and safety policy.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyPromo = async () => {
    const code = formData.promoCode.trim().toUpperCase();
    if (!code) return setError("Please enter a promo code.");
    if (promoApplied) return setError("Promo code already applied.");

    try {
      const res = await axios.post(`${API_BASE}/promo/validate`, { code });
      if (res.data.success) {
        const promo = res.data.data;
        let discountAmount = 0;

        if (promo.type === "percentage") {
          discountAmount = Math.round(
            totalBeforeDiscount * (promo.value / 100)
          );
        } else {
          discountAmount = promo.value;
        }

        setDiscount(discountAmount);
        setPromoApplied(true);
        setError("");
      } else {
        setDiscount(0);
        setError("Invalid promo code.");
      }
    } catch {
      setDiscount(0);
      setError("Invalid or expired promo code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        experienceId: booking.experienceId,
        slotId: booking.slotId,
        user: { name: formData.fullName, email: formData.email },
        guests: booking.quantity,
        promoCode: formData.promoCode || null,
      };

      const res = await axios.post(`${API_BASE}/bookings`, payload);

      if (res.data.success) {
        navigate("/confirmed", {
          state: { success: true, booking: res.data.data },
        });
      } else {
        navigate("/confirmed", {
          state: { success: false, message: res.data.message },
        });
      }
    } catch (err) {
      navigate("/confirmed", {
        state: {
          success: false,
          message: err.response?.data?.message || "Booking failed.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (!booking?.title) {
    return (
      <p className="text-center text-gray-500 mt-20">
        No booking data found. Please go back and select an experience.
      </p>
    );
  }

  const isDisabled = loading;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-lg font-medium mb-6 flex items-center gap-2">
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer text-gray-600 hover:text-black"
        >
          ←
        </span>{" "}
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-center">
        {/* Left Section - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-2xl flex-1 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none ${
                  fieldErrors.fullName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className={`w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none ${
                  fieldErrors.email ? "border-red-400" : "border-gray-300"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <label className="text-sm font-medium">Promo code</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                placeholder="Promo code"
                className={`w-full p-2 border rounded-md bg-gray-100 focus:outline-none ${
                  fieldErrors.promoCode ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="bg-black text-white px-4 rounded-md cursor-pointer hover:bg-gray-800"
              >
                Apply
              </button>
            </div>
            {fieldErrors.promoCode && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.promoCode}
              </p>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2">
                Promo applied! You saved ₹{discount}.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="accent-yellow-400"
            />
            <label className="text-xs text-gray-600">
              I agree to the terms and safety policy
            </label>
          </div>
          {fieldErrors.agree && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.agree}</p>
          )}
        </form>

        {/* Right Section - Summary */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full lg:w-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <p>Experience</p>
              <span>{booking.title}</span>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Date</span>
                <span>{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{booking.quantity}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-lg border-t pt-3 mt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`mt-6 py-2 px-4 rounded-md font-medium w-full cursor-pointer transition-all ${
              isDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {loading ? "Processing..." : "Pay & Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
