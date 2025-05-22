import React from "react";

const Tours = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 py-16 px-6 md:px-20 bg-white">
      {/* Left Side: Text Content */}
      <div className="max-w-lg text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-red-500 font-semibold mb-2">
          Promotion
        </p>
        <h2 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          We Provide You Best <br />
          <span className="text-red-600">Pakistan Sightseeing Tours</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Et labore harum non nobis ipsum eum molestias mollitia et corporis
          praesentium a laudantium internos. Non quis eius quo eligendi corrupti
          et fugiat nulla qui soluta recusandae in maxime quasi aut ducimus
          illum aut optio quibusdam!
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
          View Packages
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/assets/images/pakistan.jpg"
            alt="Minar-e-Pakistan"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          Breath Taking Views
        </p>
      </div>
    </section>
  );
};

export default Tours;
