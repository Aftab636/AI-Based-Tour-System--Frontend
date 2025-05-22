import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const Promotion = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-12">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
          <p className="text-red-500 text-sm font-semibold tracking-widest uppercase">
            Promotion
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            We Provide You Best Pakistan Sightseeing Tours
          </h1>
          <p className="text-lg font-semibold text-gray-700">
            Discover Pakistan’s Beauty with Our Expertly Crafted Tours
          </p>
          <p className="text-gray-600">
            We offer unforgettable sightseeing experiences across Pakistan,
            showcasing breathtaking landscapes, rich culture, and hidden gems.
            Whether you’re seeking adventure or relaxation, our tours ensure
            comfort and unforgettable memories. Let us guide you through the
            best destinations Pakistan has to offer!
          </p>
          <Link
            to="/signup"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition"
          >
            View Packages
          </Link>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src="/assets/images/boat.jpg"
            alt="Pakistan Sightseeing"
            className="rounded-xl shadow-xl w-full"
          />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-red-100 opacity-60 z-0 animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};

export default Promotion;
