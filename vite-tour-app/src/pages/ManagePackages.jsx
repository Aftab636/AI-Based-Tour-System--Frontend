import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourListSkeletons from "../components/TourListSkeletons";

export default function ManagePackages() {
  const navigate = useNavigate(); // ✅ Correct React Router hook
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const fetchCompanyTours = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/company/tours/`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      }
    );
    return res.data;
  };

  const {
    data = { results: [], next: null, previous: null, count: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyTours", page],
    queryFn: fetchCompanyTours,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    onError: () => toast.error("Failed to load tours."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (tourId) => {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tours/${tourId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Tour deleted successfully!");
      queryClient.invalidateQueries(["companyTours"]);
    },
    onError: () => toast.error("Failed to delete tour."),
  });

  const handleDelete = (tourId) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    deleteMutation.mutate(tourId);
  };

  const pageSize = 10;
  const totalPages = Math.ceil(data.count / pageSize);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Manage Tour Packages
          </h2>
          <button
            onClick={() => navigate("/add_package")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Package
          </button>
        </div>

        {isLoading ? (
          <TourListSkeletons />
        ) : isError ? (
          <div className="text-center text-red-500 py-6">
            Failed to load tours.
          </div>
        ) : data.results.length === 0 ? (
          <p className="text-gray-600 text-center py-6">No tours available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.results.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                >
                  {tour.main_image && (
                    <img
                      src={tour.main_image}
                      alt={tour.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {tour.description}
                    </p>
                    <p className="font-bold text-indigo-600 mb-3">
                      Price: ${tour.price_per_person}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/update_package/${tour.id}`}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-semibold"
                      >
                        <PencilIcon className="h-5 w-5 inline-block mr-1" />
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-semibold"
                      >
                        <TrashIcon className="h-5 w-5 inline-block mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 py-8">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={!data.previous}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                ← Prev
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => data.next && setPage((old) => old + 1)}
                disabled={!data.next}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
