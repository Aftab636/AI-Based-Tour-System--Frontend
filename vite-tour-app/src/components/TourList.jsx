// TourList.jsx

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaCalendarAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
  FaStar,
  FaSearch,
  FaBalanceScale,
  FaCheck,
} from "react-icons/fa";
import TourListSkeletons from "./TourListSkeletons";
import { debounce } from "lodash";
import { useComparison } from "../hooks/comparisonContext";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

export default function TourList({ initialTours = [], initialCount = 0 }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { comparedTours, addToCompare, removeFromCompare, maxCompareLimit } = useComparison();

  const {
    data: pagedData = { results: [], next: null, previous: null, count: 0 },
    isLoading,
  } = useQuery({
    queryKey: ["tours", page, sortOption, searchQuery],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/tours/`, {
          params: {
            page,
            limit: ITEMS_PER_PAGE,
            sort: sortOption,
            search: searchQuery,
          },
        })
        .then((res) => res.data),
    initialData:
      page === 1 && !searchQuery ? { results: initialTours, count: initialCount } : undefined,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const sortTours = useCallback((list, option) => {
    const arr = Array.isArray(list) ? [...list] : [];
    switch (option) {
      case "date":
        return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "priceHigh":
        return arr.sort((a, b) => b.price_per_person - a.price_per_person);
      case "priceLow":
        return arr.sort((a, b) => a.price_per_person - b.price_per_person);
      case "nameAZ":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return arr;
    }
  }, []);

  const displayedTours = useMemo(() => sortTours(pagedData?.results, sortOption), [
    pagedData?.results,
    sortOption,
    sortTours,
  ]);

  const totalPages = Math.ceil(pagedData?.count / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleSortChange = (option) => {
    setSortOption(option);
    setPage(1);
  };

  const handleSearchChange = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 300),
    []
  );

  const truncateDescription = (text, maxLength) =>
    text?.length > maxLength
      ? text.slice(0, text.lastIndexOf(" ", maxLength)) + "..."
      : text;

  const handleCompareClick = (tourId, e) => {
    e.stopPropagation();
    comparedTours.includes(tourId) ? removeFromCompare(tourId) : addToCompare(tourId);
  };

  const isCompared = (id) => comparedTours.includes(id);

  return (
    <div className="secondPart py-12 bg-gray-100">
      {/* Search */}
      <div className="my-6 px-4 md:px-10 flex justify-center">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for tours..."
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 p-2.5 w-full rounded-lg border text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="myOptions flex flex-wrap justify-center gap-4 py-6 px-4 md:px-10">
        {[{ label: "Date", value: "date", icon: <FaCalendarAlt /> },
          { label: "Price H→L", value: "priceHigh", icon: <FaSortAmountDown /> },
          { label: "Price L→H", value: "priceLow", icon: <FaSortAmountUp /> },
          { label: "Name A→Z", value: "nameAZ", icon: <FaSortAlphaDown /> },
        ].map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => handleSortChange(value)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition ${
              sortOption === value
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Compare Now Button */}
      {comparedTours.length >= 2 && (
        <div className="flex justify-center mt-4 mb-6">
          <button
            onClick={() => navigate("/compare-tours")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Compare {comparedTours.length} Tours
          </button>
        </div>
      )}

      {/* Tour Cards */}
      <div className="main-part container mx-auto mt-8">
        {isLoading ? (
          <TourListSkeletons />
        ) : (
          <div className="ImagesCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {Array.isArray(displayedTours) && displayedTours.length > 0 ? (
              displayedTours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => navigate(`/tour_info/${tour.id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] relative"
                >
                  <div className="relative">
                    <img
                      src={tour.main_image}
                      alt={tour.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      ${tour.price_per_person}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {truncateDescription(tour.description, 80)}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500 flex items-center">
                        <FaStar className="mr-1" />
                        {tour.rating || "N/A"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tour_info/${tour.id}`);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleCompareClick(tour.id, e)}
                    disabled={comparedTours.length >= maxCompareLimit && !isCompared(tour.id)}
                    className={`absolute top-2 right-2 p-2 bg-white rounded-md shadow-md text-gray-600 hover:text-red-600 ${
                      isCompared(tour.id) ? "text-red-600" : ""
                    }`}
                  >
                    {isCompared(tour.id) ? <FaCheck /> : <FaBalanceScale />}
                  </button>

                  {comparedTours.length >= maxCompareLimit && !isCompared(tour.id) && (
                    <div className="absolute bottom-2 left-2 text-xs text-red-500 bg-red-100 px-2 py-1 rounded-md">
                      Limit
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No tours found.</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 py-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!pagedData.previous}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!pagedData.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
