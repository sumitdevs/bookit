import React from "react";
import { useNavigate } from "react-router-dom";

const TourCards = ({ id, image, title, location, price,shortdescription }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-yellow-400 border border-transparent transition-all duration-300 ease-in-out flex flex-col"
    >
      {/* Image Section */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {title}
            </h2>
            <span className="bg-gray-300 text-gray-700 text-xs font-medium px-2 py-1 rounded-sm whitespace-nowrap">
              {location}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-3 leading-snug">
            {shortdescription}
          </p>
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-center mt-auto">
          <p className="text-gray-900 text-base">
            From <span className="font-bold text-lg">₹{price}</span>
          </p>
          <button
            onClick={handleViewDetails}
            className="bg-yellow-400 text-gray-900 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-yellow-500 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCards;
