import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
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
      "Get curated travel suggestions based on your interests like adventure, nature, culture, and more.",
    icon: <FaCompass size={40} />,
  },
  {
    title: "Trip Planning Guide",
    description:
      "Access sample itineraries, travel tips, and budget planning to make your tour stress-free.",
    icon: <FaSuitcase size={40} />,
  },
  {
    title: "Accommodation Advice",
    description:
      "Find the best places to stay — from affordable hostels to luxurious resorts.",
    icon: <FaHotel size={40} />,
  },
  {
    title: "Transport Guidance",
    description:
      "Navigate local travel easily with advice on public transport, car rentals, and more.",
    icon: <FaCar size={40} />,
  },
  {
    title: "Local Experiences",
    description:
      "Discover unique local activities, food tours, cultural festivals, and hidden gems.",
    icon: <FaGlobe size={40} />,
  },
  {
    title: "24/7 Travel Support",
    description:
      "Reach out to us anytime for help with your trip — we’re just a message away.",
    icon: <FaPhone size={40} />,
  },
];

const ServicesPage = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen pt-24 px-6 py-16 bg-gradient-to-br from-white via-red-50 to-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-red-500">
            Our Services
          </h1>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover the full range of features we offer to enhance your travel journey — from planning to personalized support.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {enhancedServices.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group text-center flex flex-col items-center"
              >
                <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Ready to plan your next adventure?
            </h2>
            <Link
              to="/packages"
              className="inline-block bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default ServicesPage;
