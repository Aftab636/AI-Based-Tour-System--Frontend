import React from "react";
import Promotion from "../components/Promotion";
import VideoComponent from "../components/VideoComponent";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="bg-white font-poppins box-border">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <img
          src="public/assets/images/swat.jpg"
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 flex flex-col justify-center items-center text-center h-full text-white px-4">
          <p className="text-sm uppercase tracking-wider">Discover</p>
          <h1 className="text-5xl md:text-6xl font-semibold">About Us</h1>
          <p className="mt-4 max-w-xl text-lg">
            Learn more about our journey, values, and commitment to bringing the best travel experiences to you.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          We are an AI-powered tour recommendation platform committed to simplifying the way people plan and book their travel.
          From solo backpackers to corporate retreat planners, we serve a wide range of travel needs with curated options,
          real-time availability, and smart suggestions tailored to user preferences.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2  text-red-500">Smart Recommendations</h3>
              <p className="text-gray-600">
                Our AI learns from your preferences to recommend tours that truly fit your style and budget.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2 text-red-500">Trusted Vendors</h3>
              <p className="text-gray-600">
                We partner with the best travel agencies and guides to ensure high-quality, safe experiences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2 text-red-500">All-in-One Platform</h3>
              <p className="text-gray-600">
                From inspiration to booking to post-trip reviews, we handle it all — beautifully and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          To empower travelers with smart tools and trusted options so they can explore the world effortlessly and confidently.
          We believe that everyone deserves a personalized, enjoyable, and hassle-free travel experience.
        </p>
      </section>

      {/* Promo Section */}
      <section className="py-16">
        <Promotion />
      </section>

      {/* Video Section */}
      <section className="py-16">
        <VideoComponent />
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default AboutUs;
