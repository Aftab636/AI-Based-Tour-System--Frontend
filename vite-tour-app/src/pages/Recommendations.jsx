import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaCompass,
  FaSuitcase,
  FaHotel,
  FaCar,
  FaGlobe,
  FaPhone,
} from "react-icons/fa";

const enhancedServices = [
  {
    title: "Tour Recommendations",
    description:
      "Get curated travel suggestions based on your interests like adventure, nature, culture, and more. Imagine finding the perfect hiking trip...",
    icon: <FaCompass size={40} />,
    learnMoreLink: "/recommendations/preferences",
    callToAction: "Explore Recommendations",
  },
  {
    title: "Trip Planning Guide",
    description:
      "Access sample itineraries, travel tips, and budget planning to make your tour stress-free. Download our guide...",
    icon: <FaSuitcase size={40} />,
    learnMoreLink: "/trip-planning",
    callToAction: "Download Guide",
  },
  {
    title: "Accommodation Advice",
    description:
      "Find the best places to stay — from affordable hostels to luxurious resorts. Browse our curated list...",
    icon: <FaHotel size={40} />,
    learnMoreLink: "/accommodation",
    callToAction: "Browse Stays",
  },
  {
    title: "Transport Guidance",
    description:
      "Navigate local travel easily with advice on public transport, car rentals, and more. Get tips for your destination...",
    icon: <FaCar size={40} />,
    learnMoreLink: "/transport",
    callToAction: "Get Transport Info",
  },
  {
    title: "Local Experiences",
    description:
      "Discover unique local activities, food tours, cultural festivals, and hidden gems. Uncover authentic experiences...",
    icon: <FaGlobe size={40} />,
    learnMoreLink: "/local-experiences",
    callToAction: "Find Local Activities",
  },
  {
    title: "24/7 Travel Support",
    description:
      "Reach out to us anytime for help with your trip — we’re just a message away. Contact our support team now...",
    icon: <FaPhone size={40} />,
    learnMoreLink: "/contact",
    callToAction: "Contact Support",
  },
];

const Recommendations = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-24 px-6 pb-20 bg-gradient-to-br from-blue-50 to-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
            Your Recommendations
          </h1>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the services and recommendations tailored to elevate your
            travel experience.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {enhancedServices.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-6 transition duration-300 flex flex-col items-center text-center"
              >
                <div className="text-blue-500 mb-4 hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description.slice(0, 100)}...
                </p>
                <Link
                  to={service.learnMoreLink}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mb-2"
                >
                  Learn More
                </Link>
                {service.callToAction && (
                  <Link
                    to={service.learnMoreLink}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    {service.callToAction}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Ready to explore tailored tours?
            </h2>
            <Link
              to="/recommendations/preferences"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Set Your Preferences
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recommendations;
