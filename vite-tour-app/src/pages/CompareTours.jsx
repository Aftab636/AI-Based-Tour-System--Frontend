import React from "react";
import { useComparison } from "../hooks/comparisonContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const CompareToursPage = () => {
  const { comparedTours, removeFromCompare } = useComparison();

  const {
    data: comparedTourDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comparePageTourDetails", comparedTours],
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

  if (comparedTours.length < 2) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Tours</h2>
        <p className="text-gray-600">
          Please select at least two tours to compare.
          <Link to="/packages" className="text-red-600 font-semibold hover:underline ml-1">
            Browse Tours
          </Link>
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Comparing Tours...</h2>
        <p className="text-gray-500">Loading tour details...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Compare Page Error:", error);
    return (
      <div className="container mx-auto py-12 px-4 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-2">Error Comparing Tours</h2>
        <p className="text-gray-500">Failed to load comparison data.</p>
      </div>
    );
  }

  if (!comparedTourDetails || comparedTourDetails.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Compare Tours</h2>
        <p className="text-gray-600">No tours selected.</p>
        <Link to="/tours" className="text-red-500 hover:underline mt-2 inline-block">
          Browse Tours
        </Link>
      </div>
    );
  }

  const compareAttributes = [
    { name: "Price", key: "dynamic_price", format: (v) => `$${v}` },
    { name: "Duration", key: "duration" },
    { name: "Location", key: "location" },
    { name: "Availability", key: "availability" },
    { name: "Min Group", key: "min_group_size" },
    { name: "Max Group", key: "max_group_size" },
    { name: "Tour Type", key: "tour_type" },
    { name: "Season", key: "season" },
    { name: "Tags", key: "tags", format: (v) => v?.join(", ") || "N/A" },
    { name: "Start Date", key: "start_date" },
    { name: "End Date", key: "end_date" },
    { name: "Description", key: "description", format: (v) => v?.substring(0, 100) + "..." },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Comparing {comparedTourDetails.length} Tours
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full table-auto text-sm text-gray-700 font-sans">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase border-b sticky top-0 z-10">
            <tr>
              <th className="text-left p-4 font-bold border-r bg-white">Attribute</th>
              {comparedTourDetails.map((tour) => (
                <th key={tour.id} className="text-center px-4 py-3 font-semibold border-r relative">
                  <div className="flex justify-center items-center gap-2">
                    <span>{tour.title}</span>
                    <button
                      onClick={() => removeFromCompare(tour.id)}
                      className="text-red-500 hover:text-red-700 absolute right-2 top-3"
                      title={`Remove ${tour.title}`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {compareAttributes.map((attr) => (
              <tr key={attr.key} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium border-r bg-gray-50 text-gray-800">{attr.name}</td>
                {comparedTourDetails.map((tour) => (
                  <td key={tour.id} className="p-4 text-center border-r">
                    {attr.format ? attr.format(tour[attr.key]) : tour[attr.key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50 border-t">
              <td className="p-4 font-medium border-r"></td>
              {comparedTourDetails.map((tour) => (
                <td key={tour.id} className="text-center p-4">
                  <Link
                    to={`/tour_info/${tour.id}`}
                    className="inline-block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareToursPage;
