import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const success = state?.success;
  const booking = state?.booking;
  const message = state?.message;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col justify-center items-center bg-white text-center px-4">
      {success ? (
        <>
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900">Booking Confirmed</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Ref ID: {booking?._id?.slice(-6).toUpperCase()}
          </p>
        </>
      ) : (
        <>
          <XCircle className="text-red-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900">Booking Failed</h1>
          <p className="text-gray-500 mt-1 text-sm">{message || "Something went wrong."}</p>
        </>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmed;
