import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import RecommendationList from "../components/RecommendationList";

export default function RecommendationResults() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("tourRecommendations");
    if (stored) {
      setRecommendations(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-white to-red-50 px-4 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-500 mb-2">Recommended Tours for You</h1>
            <p className="text-gray-600 text-lg">
              Hand-picked experiences based on your preferences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg transition hover:shadow-2xl duration-300">
            <RecommendationList tours={recommendations} />
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
