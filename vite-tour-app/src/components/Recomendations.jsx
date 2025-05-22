import React from "react";

const Recomendations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12 py-12">
      {/* Nature Section */}
      <div className="relative h-80 rounded-xl overflow-hidden group">
        <img
          src="/assets/images/nature.jpg"
          alt="Explore Nature"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <p className="uppercase tracking-wider text-sm mb-2">Promotion</p>
          <h2 className="text-3xl font-bold mb-4">Explore Nature</h2>
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
            View Packages
          </button>
        </div>
      </div>

      {/* Cities Section */}
      <div className="relative h-80 rounded-xl overflow-hidden group">
        <img
          src="/assets/images/city.jpg"
          alt="Explore Cities"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <p className="uppercase tracking-wider text-sm mb-2">Promotion</p>
          <h2 className="text-3xl font-bold mb-4">Explore Cities</h2>
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
            View Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recomendations;
