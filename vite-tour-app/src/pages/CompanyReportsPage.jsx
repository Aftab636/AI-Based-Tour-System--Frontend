import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyReportsPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/company/tours/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTours(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch company tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="text-lg text-gray-600 font-medium animate-pulse">
          Fetching tour reports...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Company Tour Reports
          </h1>
          <p className="mt-2 text-gray-500">
            A comprehensive view of all your published tour packages
          </p>
          <div className="w-24 h-1 mx-auto bg-red-500 mt-4 rounded" />
        </div>

        {/* Report Table */}
        {tours.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No tours found under your company profile.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg ring-1 ring-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50 text-gray-700 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Group Size</th>
                  <th className="px-6 py-4 text-left">Availability</th>
                  <th className="px-6 py-4 text-left">Start Date</th>
                  <th className="px-6 py-4 text-left">End Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {tours.map((tour, idx) => (
                  <tr
                    key={tour.id}
                    className={`hover:bg-gray-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{tour.title}</td>
                    <td className="px-6 py-4 text-gray-600">{tour.location}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">${tour.price_per_person}</td>
                    <td className="px-6 py-4 text-gray-700">{tour.duration} days</td>
                    <td className="px-6 py-4 text-gray-700">
                      {tour.min_group_size} – {tour.max_group_size}
                    </td>
                    <td className="px-6 py-4 text-blue-600 capitalize">{tour.availability}</td>
                    <td className="px-6 py-4 text-gray-600">{tour.start_date}</td>
                    <td className="px-6 py-4 text-gray-600">{tour.end_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyReportsPage;
