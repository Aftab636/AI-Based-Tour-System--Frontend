// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Bookmark,
//   BookmarkCheck,
//   ChevronDown,
//   ChevronUp,
//   Scale,
//   Check,
// } from "lucide-react";
// import { useComparison } from "../hooks/comparisonContext"; // ✅ Add this line

// export default function RecommendationList({ tours = [] }) {
//   const navigate = useNavigate();
//   const [bookmarkedTours, setBookmarkedTours] = useState([]);
//   const [sortBy, setSortBy] = useState("");
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const {
//     comparedTours,
//     addToCompare,
//     removeFromCompare,
//     maxCompareLimit,
//   } = useComparison(); // ✅ Use comparison context

//   const toggleBookmark = (id, event) => {
//     event.stopPropagation();
//     setBookmarkedTours((prev) =>
//       prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
//     );
//   };

//   const toggleCompare = (id, event) => {
//     event.stopPropagation();
//     if (comparedTours.includes(id)) {
//       removeFromCompare(id);
//     } else if (comparedTours.length < maxCompareLimit) {
//       addToCompare(id);
//     }
//   };

//   const isCompared = (id) => comparedTours.includes(id);

//   const sortOptions = [
//     { value: "", label: "Sort By" },
//     { value: "priceLow", label: "Price: Low to High" },
//     { value: "priceHigh", label: "Price: High to Low" },
//     { value: "match", label: "Match Score" },
//     { value: "duration", label: "Duration" },
//   ];

//   const sortedTours = useMemo(() => {
//     const copied = [...tours];
//     switch (sortBy) {
//       case "priceLow":
//         return copied.sort((a, b) => (a.price_per_person || Infinity) - (b.price_per_person || Infinity));
//       case "priceHigh":
//         return copied.sort((a, b) => (b.price_per_person || -Infinity) - (a.price_per_person || -Infinity));
//       case "match":
//         return copied.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
//       case "duration":
//         return copied.sort((a, b) => (a.duration || Infinity) - (b.duration || Infinity));
//       default:
//         return copied;
//     }
//   }, [sortBy, tours]);

//   if (!tours.length) {
//     return (
//       <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-200 shadow">
//         <p className="text-lg text-gray-500">No tours match your preferences.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Sort Dropdown */}
//       <div className="flex justify-end mb-6 relative">
//         <button
//           onClick={() => setIsSortOpen(!isSortOpen)}
//           className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
//         >
//           {sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort By"}
//           {isSortOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//         </button>

//         {isSortOpen && (
//           <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg z-20 w-52">
//             {sortOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => {
//                   setSortBy(option.value);
//                   setIsSortOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
//                   sortBy === option.value ? "bg-blue-100 text-blue-700" : ""
//                 }`}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Tour Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sortedTours.map((tour) => (
//           <div
//             key={tour.id}
//             onClick={() => navigate(`/tour_info/${tour.id}`)}
//             className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative cursor-pointer"
//           >
//             {/* Bookmark */}
//             <button
//               onClick={(e) => toggleBookmark(tour.id, e)}
//               className="absolute top-3 right-3 z-10 bg-white shadow p-2 rounded-full hover:scale-110 transition"
//             >
//               {bookmarkedTours.includes(tour.id) ? (
//                 <BookmarkCheck className="w-5 h-5 text-blue-600" />
//               ) : (
//                 <Bookmark className="w-5 h-5 text-gray-400" />
//               )}
//             </button>

//             {/* Compare Button */}
//             <button
//               onClick={(e) => toggleCompare(tour.id, e)}
//               disabled={comparedTours.length >= maxCompareLimit && !isCompared(tour.id)}
//               className={`absolute bottom-3 right-3 z-10 bg-white shadow p-2 rounded-full hover:scale-110 transition ${
//                 isCompared(tour.id) ? "text-red-500" : "text-gray-400"
//               }`}
//               title={isCompared(tour.id) ? "Remove from Compare" : "Add to Compare"}
//             >
//               {isCompared(tour.id) ? <Check className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
//             </button>

//             {/* Image */}
//             <div className="h-48 w-full overflow-hidden bg-gray-100">
//               {tour.image ? (
//                 <img src={tour.image} alt={tour.title} className="object-cover w-full h-full" />
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
//               )}
//             </div>

//             {/* Info */}
//             <div className="p-4 space-y-2">
//               <h3 className="text-lg font-semibold text-gray-800 truncate">{tour.title}</h3>
//               <p className="text-sm text-gray-600 truncate"><strong>Company:</strong> {tour.company || "N/A"}</p>
//               <p className="text-sm text-gray-600 truncate"><strong>Location:</strong> {tour.location}</p>
//               <p className="text-sm text-gray-600"><strong>Type:</strong> {tour.tour_type || "General"}</p>
//               <p className="text-sm text-gray-600"><strong>Duration:</strong> {tour.duration ? `${tour.duration} days` : "Flexible"}</p>
//               <p className="text-sm text-gray-600"><strong>Price:</strong> ${tour.price_per_person || tour.price || "N/A"}</p>
//               {tour.match_score && (
//                 <div className="pt-2">
//                   <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                     {Math.round(tour.match_score * 100)}% Match
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react";
import { useComparison } from "../hooks/comparisonContext";

export default function RecommendationList({ tours = [] }) {
  const [bookmarkedTours, setBookmarkedTours] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const navigate = useNavigate();
  const { comparedTours, addToCompare, removeFromCompare, maxCompareLimit } = useComparison();

  const toggleBookmark = (id, event) => {
    event.stopPropagation();
    setBookmarkedTours((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id, event) => {
    event.stopPropagation();
    if (comparedTours.includes(id)) {
      removeFromCompare(id);
    } else if (comparedTours.length < maxCompareLimit) {
      addToCompare(id);
    }
  };

  const isCompared = (id) => comparedTours.includes(id);

  const sortOptions = [
    { value: "", label: "Sort By" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "match", label: "Match Score" },
    { value: "duration", label: "Duration" },
  ];

  const sortedTours = useMemo(() => {
    const copied = [...tours];
    switch (sortBy) {
      case "priceLow":
        return copied.sort(
          (a, b) =>
            (a.price_per_person || Infinity) - (b.price_per_person || Infinity)
        );
      case "priceHigh":
        return copied.sort(
          (a, b) =>
            (b.price_per_person || -Infinity) - (a.price_per_person || -Infinity)
        );
      case "match":
        return copied.sort(
          (a, b) => (b.match_score || 0) - (a.match_score || 0)
        );
      case "duration":
        return copied.sort((a, b) => (a.duration || Infinity) - (b.duration || Infinity));
      default:
        return copied;
    }
  }, [sortBy, tours]);

  if (!tours.length) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-200 shadow">
        <p className="text-lg text-gray-500">No tours match your preferences.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6 relative">
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort By"}
          {isSortOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isSortOpen && (
          <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg z-20 w-52">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                  sortBy === option.value ? "bg-blue-100 text-blue-700" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Compare Button */}
      {comparedTours.length >= 2 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/compare-tours")}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Compare {comparedTours.length} Tours
          </button>
        </div>
      )}

      {/* Grid of Tour Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => navigate(`/tour_info/${tour.id}`)}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative cursor-pointer"
          >
            {/* Bookmark */}
            <button
              onClick={(e) => toggleBookmark(tour.id, e)}
              className="absolute top-3 right-3 z-10 bg-white shadow p-2 rounded-full hover:scale-110 transition"
            >
              {bookmarkedTours.includes(tour.id) ? (
                <BookmarkCheck className="w-5 h-5 text-red-500" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Compare Toggle */}
            <button
              onClick={(e) => toggleCompare(tour.id, e)}
              disabled={comparedTours.length >= maxCompareLimit && !isCompared(tour.id)}
              className={`absolute top-3 left-3 z-10 bg-white shadow p-2 rounded-full transition ${
                isCompared(tour.id) ? "text-red-600" : "text-gray-400"
              }`}
            >
              {isCompared(tour.id) ? "✓" : "⇄"}
            </button>

            {/* Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-100">
              {tour.image ? (
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                <strong>Company:</strong> {tour.company || "N/A"}
              </p>
              <p className="text-sm text-gray-600 truncate">
                <strong>Location:</strong> {tour.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {tour.tour_type || "General"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong>{" "}
                {tour.duration ? `${tour.duration} days` : "Flexible"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Price:</strong> ${tour.price_per_person || tour.price || "N/A"}
              </p>

              {tour.match_score && (
                <div className="pt-2">
                  <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {Math.round(tour.match_score * 100)}% Match
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
