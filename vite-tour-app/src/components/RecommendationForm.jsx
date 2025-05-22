"use client";

import { useState } from "react";

export default function RecommendationForm({ onSubmit, loading }) {
  const [preferences, setPrefs] = useState({
    budgetMin: 0,
    budgetMax: 1000,
    tourTypes: [],
    locations: [],
    groupSize: 1,
    method: "hybrid",
  });

  const [errors, setErrors] = useState({});

  const tourTypes = [
    "Adventure", "Cultural Immersion", "Historical Exploration", "Nature & Wildlife",
    "Beach Getaway", "Mountain Expedition", "City Sightseeing", "Food & Culinary",
    "Luxury Escape", "Party", "Family", "DJ Night", "Classical",
  ];

  const locations = [
    "Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "Murree", "Nathiagali",
    "Swat Valley", "Gilgit", "Hunza Valley", "Skardu", "Chitral", "Mohenjo-daro",
    "Taxila", "Kalam",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value)
          : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!preferences.budgetMin || preferences.budgetMin < 0)
      newErrors.budgetMin = "Minimum budget is required.";
    if (!preferences.budgetMax || preferences.budgetMax <= preferences.budgetMin)
      newErrors.budgetMax = "Maximum must be greater than minimum.";
    if (!preferences.tourTypes.length)
      newErrors.tourTypes = "At least one tour type must be selected.";
    if (!preferences.locations.length)
      newErrors.locations = "Select at least one location.";
    if (!preferences.groupSize || preferences.groupSize < 1)
      newErrors.groupSize = "Group size must be at least 1.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(preferences);
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 space-y-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-red-400 text-center">
          🧭 Personalize Your Dream Tour
        </h2>

        {/* Budget Range */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Budget Range ($)
          </label>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="number"
                name="budgetMin"
                value={preferences.budgetMin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Minimum"
              />
              {errors.budgetMin && (
                <p className="text-sm text-red-500 mt-1">{errors.budgetMin}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="number"
                name="budgetMax"
                value={preferences.budgetMax}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Maximum"
              />
              {errors.budgetMax && (
                <p className="text-sm text-red-500 mt-1">{errors.budgetMax}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tour Types */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Tour Types</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tourTypes.map((label) => {
              const value = label.toLowerCase().replace(/ /g, "_");
              return (
                <label key={label} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="tourTypes"
                    value={value}
                    checked={preferences.tourTypes.includes(value)}
                    onChange={handleChange}
                    className="text-red-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              );
            })}
          </div>
          {errors.tourTypes && (
            <p className="text-sm text-red-500 mt-1">{errors.tourTypes}</p>
          )}
        </div>

        {/* Locations */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Preferred Locations
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((label) => {
              const value = label.toLowerCase().replace(/ /g, "_");
              return (
                <label key={label} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="locations"
                    value={value}
                    checked={preferences.locations.includes(value)}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              );
            })}
          </div>
          {errors.locations && (
            <p className="text-sm text-red-500 mt-1">{errors.locations}</p>
          )}
        </div>

        {/* Group Size */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Group Size</label>
          <input
            type="number"
            name="groupSize"
            min="1"
            value={preferences.groupSize}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.groupSize && (
            <p className="text-sm text-red-500 mt-1">{errors.groupSize}</p>
          )}
        </div>

        {/* Recommendation Method */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Recommendation Method
          </label>
          <select
            name="method"
            value={preferences.method}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="hybrid">✨ Hybrid (Content + Ratings)</option>
            <option value="content">📚 Content-Based Only</option>
            <option value="popular">🔥 Popular Tours</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-400 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
}
