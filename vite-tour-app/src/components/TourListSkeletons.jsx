export default function TourListSkeletons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white animate-pulse rounded-xl shadow-lg p-6 flex flex-col border border-gray-100"
        >
          {/* Image Placeholder */}
          <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-5 shadow-inner" />

          {/* Title Placeholder */}
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3" />

          {/* Description Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />

          {/* Price & Button Placeholder */}
          <div className="flex justify-between mt-auto">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-8 w-24 bg-gray-300 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
