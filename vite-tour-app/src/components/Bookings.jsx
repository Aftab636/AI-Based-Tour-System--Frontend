import React from "react";

const Bookings = () => {
  return (
    <div className="bg-white py-16 px-4">
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Text Content */}
        <div className="lg:w-1/2 space-y-8">
          <p className="text-blue-600 font-semibold uppercase">Fast & Easy</p>
          <h2 className="text-4xl font-bold leading-tight text-gray-800">
            Get Your Favourite <br />
            <span className="text-blue-600">Resort Bookings</span>
          </h2>

          <div className="space-y-6">
            {["Choose Destination", "Check Availability", "Let's Go"].map(
              (step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    src={`/assets/images/icon${index + 1}.png`}
                    alt={step}
                    className="w-12 h-12"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {step}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna, tortor tempus.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2">
          <img
            src="/assets/images/hawaii.png"
            alt="Trip to Hawaii"
            className="rounded-xl shadow-xl w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default Bookings;
