import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
  useEffect(() => {
    fetch(`${API_BASE}/experiences/${id}`)
      .then((res) => res.json())
      .then((data) => setExp(data.data))
      .catch((err) => console.error("Error fetching experience:", err));
  }, [id]);

  if (!exp) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const availableDates = [...new Set(exp.slots.map((slot) => slot.date))];

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  const filteredSlots = selectedDate
    ? exp.slots.filter((slot) => slot.date === selectedDate)
    : [];

  const selectedSlot = exp.slots.find(
    (slot) => slot.date === selectedDate && slot.time === selectedTime
  );

  const subtotal = selectedSlot ? selectedSlot.price * quantity : 0;
  const taxes = subtotal ? Math.round(subtotal * 0.06) : 0;
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time before continuing.");
      return;
    }

    if (!selectedSlot) {
      alert("Selected slot is invalid or unavailable.");
      return;
    }

    if (quantity < 1) {
      alert("Please select at least one participant.");
      return;
    }

    if (quantity > selectedSlot.available) {
      alert(`Only ${selectedSlot.available} spots left for this time.`);
      return;
    }

    navigate("/checkout", {
      state: {
        title: exp.title,
        experienceId: exp._id,
        slotId: selectedSlot._id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        pricePerPerson: selectedSlot.price,
        quantity,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-lg font-medium mb-6 flex items-center gap-2">
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer text-gray-600 hover:text-black"
        >
          ←
        </span>{" "}
        Details
      </h1>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img
            src={exp.images?.[0]?.url}
            alt={exp.title}
            className="rounded-2xl w-full h-96 object-cover mb-6"
          />

          <h2 className="text-2xl font-semibold mb-2">{exp.title}</h2>
          <p className="text-gray-600 mb-4">{exp.longDescription}</p>

          <h3 className="font-semibold mb-2">Choose Date</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                className={`px-4 py-2 rounded-lg ${
                  selectedDate === date
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Choose Time</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedTime === slot.time
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  disabled={slot.available <= 0}
                >
                  {slot.time}{" "}
                  <span
                    className={`ml-1 text-sm ${
                      slot.available <= 3 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {slot.available > 0
                      ? `${slot.available} left`
                      : "Sold Out"}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-500">No slots available for this date</p>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* Right Section */}
        <div className="border rounded-2xl p-6 bg-gray-50 h-fit shadow-md">
          <p className="text-sm text-gray-500 mb-2">
            Starts at{" "}
            <span className="float-right font-medium">
              ₹{exp.slots[0].price}
            </span>
          </p>

          {/* Quantity Selector */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg font-semibold"
              >
                –
              </button>
              <span className="px-3">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) =>
                    selectedSlot && q < selectedSlot.available ? q + 1 : q
                  )
                }
                className="px-3 py-1 text-lg font-semibold"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <hr className="my-2" />
          <p className="flex justify-between">
            Subtotal <span>₹{subtotal}</span>
          </p>
          <p className="flex justify-between">
            Taxes <span>₹{taxes}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-semibold">
            Total <span>₹{total}</span>
          </p>

          <button
            onClick={handleConfirm}
            className="mt-4 w-full py-2 rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
