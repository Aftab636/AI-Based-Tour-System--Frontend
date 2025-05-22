import React from "react";
import { useNavigate } from "react-router-dom";

const PlanTour = ({ tourId }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (tourId) {
      navigate(`/payment/${tourId}`);
    } else {
      alert("Tour ID is missing. Cannot proceed to payment.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Plan Your Trip</h2>

      {/* Additional planning fields can go here if needed */}

      <button
        onClick={handleBooking}
        className="bg-red-500 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        Book Now
      </button>
    </div>
  );
};

export default PlanTour;
