import React, { useState } from "react";
import { useComparison } from "../hooks/comparisonContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa";

const CompareTray = () => {
  const { comparedTours, removeFromCompare } = useComparison();
  const [isMinimized, setIsMinimized] = useState(false);

  const {
    data: comparedTourDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comparedToursDetails", comparedTours],
    queryFn: async () => {
      if (comparedTours.length > 0) {
        const requests = comparedTours.map((tourId) =>
          axios.get(`${import.meta.env.VITE_API_URL}/api/tours/${tourId}/`)
        );
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data);
      }
      return [];
    },
    enabled: comparedTours.length > 0,
    staleTime: Infinity,
  });

  if (comparedTours.length === 0) return null;

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 transition-all duration-300 ${
        isMinimized ? "py-1" : "p-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Toggle Minimize Button */}
        <button
          onClick={toggleMinimize}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label={isMinimized ? "Expand compare tray" : "Minimize compare tray"}
        >
          {isMinimized ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </button>

        {/* Tour Items Display */}
        {!isMinimized && (
          <div className="flex items-center space-x-4 overflow-x-auto">
            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-red-500">Error loading tray.</div>}
            {comparedTourDetails &&
              comparedTourDetails.map((tour) => (
                <div
                  key={tour.id}
                  className="flex items-center border rounded-md p-2 shadow-sm bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-sm mr-2 overflow-hidden">
                    <img
                      loading="lazy"
                      src={tour.main_image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold line-clamp-1">
                    {tour.title}
                  </span>
                  <button
                    onClick={() => removeFromCompare(tour.id)}
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
                    aria-label={`Remove ${tour.title} from comparison`}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Compare Button */}
        {comparedTours.length >= 2 && (
          <Link to="/compare-tours">
            <span className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 cursor-pointer focus:outline-none">
              Compare ({comparedTours.length})
            </span>
          </Link>
        )}
      </div>

      {/* Minimized Summary */}
      {isMinimized && (
        <div className="container mx-auto text-center text-xs text-gray-600 py-0.5">
          Comparing {comparedTours.length} tour{comparedTours.length > 1 && "s"}.
        </div>
      )}
    </div>
  );
};

export default CompareTray;
