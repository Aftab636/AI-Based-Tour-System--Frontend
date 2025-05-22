import { useState } from "react";

const BuildPackageForm = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [destination, setDestination] = useState("");
  const [accommodationSelected, setAccommodationSelected] = useState(false);
  const [error, setError] = useState("");

  const handleActivityToggle = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = async () => {
    if (!destination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    if (!guests) {
      alert("Please select the number of guests.");
      return;
    }

    const payload = {
      destination,
      startDate,
      endDate,
      guests,
      activities: selectedActivities,
      accommodation: accommodationSelected,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tour-packages/create/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Package built successfully!");
      } else {
        alert("Error: " + (data.error || "Something went wrong."));
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Build Your Own Package</h1>

        {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

        {/* Destination */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Destination <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dates & Guests */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block font-medium mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border rounded-md bg-white focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border rounded-md bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Guests <span className="text-red-500">*</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-3 border rounded-md bg-gray-50"
          >
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>{`${g} adult${g > 1 ? "s" : ""}`}</option>
            ))}
          </select>
        </div>

        {/* Activities */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Activity Preferences (optional)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Culture", "Outdoors", "Relaxing", "Wildlife", "Romantic",
              "Religious", "Hiking", "Musical", "Shopping", "Business",
              "Museums", "Party", "Traditions", "Walks", "Fishing",
              "Cruise", "Guide", "Healthcare",
            ].map((activity) => (
              <label key={activity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity)}
                  onChange={() => handleActivityToggle(activity)}
                  className="accent-blue-500"
                />
                <span>{activity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={accommodationSelected}
              onChange={(e) => setAccommodationSelected(e.target.checked)}
              className="accent-blue-500"
            />
            <span>Include accommodation in package</span>
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Build Package
        </button>
      </div>
    </div>
  );
};

export default BuildPackageForm;
