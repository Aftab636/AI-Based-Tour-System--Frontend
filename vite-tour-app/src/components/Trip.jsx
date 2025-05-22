import React from "react";

const Trip = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-16 px-6 md:px-20 bg-white gap-10">
      {/* Left Side: Text Content */}
      <div className="max-w-xl text-center lg:text-left">
        <p className="text-sm uppercase text-blue-500 tracking-wide font-semibold mb-2">
          Adventure Trips
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Our Thrilling <br />
          <span className="text-blue-600">Adventure Expeditions</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Embark on an adrenaline-fueled journey to some of the most exhilarating destinations.
          From mountain treks to wild safaris, our adventure tours offer the perfect blend of thrill,
          nature, and exploration. Get ready to challenge yourself and create memories that will last a lifetime!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
          View Packages
        </button>
      </div>

      {/* Right Side: Styled Image */}
      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] overflow-hidden shadow-xl border border-gray-200">
          <img
            src="/assets/images/trip.png"
            alt="Adventure"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          Adventure Expeditions
        </p>
      </div>
    </section>
  );
};

export default Trip;
