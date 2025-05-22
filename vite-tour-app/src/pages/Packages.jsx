import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import TourList from "../components/TourList";
import axios from "axios";

const Packages = () => {
  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tours/`);
        const data = res.data.results || [];

        setAllTours(data);
        // ✅ Show first 6 tours by default
        setFilteredTours(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    let filtered = allTours;

    if (budgetMin !== "") {
      filtered = filtered.filter(tour => tour.price_per_person >= parseFloat(budgetMin));
    }

    if (budgetMax !== "") {
      filtered = filtered.filter(tour => tour.price_per_person <= parseFloat(budgetMax));
    }

    // ✅ If no filters applied, show first 6 tours only
    if (budgetMin === "" && budgetMax === "") {
      filtered = allTours.slice(0, 6);
    }

    setFilteredTours(filtered);
  }, [budgetMin, budgetMax, allTours]);

  return (
    <>
      <div className="relative w-full min-h-screen bg-[url('/assets/images/background.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        <Navbar />
        <section className="relative z-10 flex flex-col items-center justify-center h-[90vh] text-center text-white">
          <p className="text-sm uppercase tracking-wider text-gray-300">Explore the world</p>
          <h1 className="text-6xl md:text-7xl font-extrabold font-[Great Vibes] drop-shadow-lg">
            Travel with us
          </h1>
          <span className="mt-4 text-lg text-gray-200">Unforgettable adventures await</span>
        </section>
      </div>

      {/* Tour List with Filters */}
      <section className="px-6 md:px-20 lg:px-40 py-10 bg-gray-100">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Available Packages</h2>
          <p className="text-gray-600 mt-2">Choose from curated experiences tailored just for you</p>
        </div>

        {/* Budget Filters */}
        <div className="flex flex-wrap justify-center gap-6 items-end bg-white shadow-sm rounded-md p-6 mb-10">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Min Budget</label>
            <input
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              placeholder="e.g. 100"
              className="border px-3 py-2 rounded-md w-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Max Budget</label>
            <input
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              placeholder="e.g. 1000"
              className="border px-3 py-2 rounded-md w-32"
            />
          </div>
        </div>

        <TourList initialTours={filteredTours} initialCount={filteredTours.length} />
      </section>

      <FooterSection />
    </>
  );
};

export default Packages;
