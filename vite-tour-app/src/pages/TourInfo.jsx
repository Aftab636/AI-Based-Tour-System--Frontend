import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaImage,
  FaListAlt,
  FaInfoCircle,
  FaClock,
  FaUsers,
  FaTag,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import PlanTour from "../components/PlanTour";
import GalleryContent from "../components/GalleryContent";
import TourPlanContent from "../components/TourPlanContent";
import MapContent from "../components/MapContent";

const tabConfig = [
  { id: "information", label: "Information", icon: <FaInfoCircle /> },
  { id: "tourplan", label: "Tour Plan", icon: <FaListAlt /> },
  { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
  { id: "gallery", label: "Gallery", icon: <FaImage /> },
];

const TourInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("information");
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tours/${id}`);
        if (!res.ok) throw new Error("Failed to fetch tour data.");
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tour details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!tour) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{tour.title}</h1>
            <p className="text-xl font-semibold text-red-500 mb-6">
              From ${tour.dynamic_price || tour.price_per_person} per person
              {tour.dynamic_price &&
                tour.dynamic_price !== tour.price_per_person && (
                  <span className="ml-2 text-gray-400 text-sm">
                    (Base: ${tour.price_per_person})
                  </span>
                )}
            </p>
            <img
              src={tour.main_image}
              alt={tour.title}
              className="w-full rounded-2xl shadow-lg object-cover aspect-video mb-8"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
              <p className="text-gray-700">{tour.description || "No description available."}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-600">
              <div className="flex items-center gap-2">
                <FaClock /> Duration: {tour.duration}
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt /> Location: {tour.location}
              </div>
              <div className="flex items-center gap-2">
                <FaUsers /> Group Size: {tour.min_group_size}–{tour.max_group_size}
              </div>
              {tour.tour_type && (
                <div className="flex items-center gap-2">
                  <FaTag /> Type: {tour.tour_type}
                </div>
              )}
              {tour.season && (
                <div className="flex items-center gap-2">
                  <FaTag /> Season: {tour.season}
                </div>
              )}
              {tour.tags?.length > 0 && (
                <div className="flex items-center gap-2">
                  <FaTag /> Tags: {tour.tags.join(", ")}
                </div>
              )}
            </div>
          </>
        );
      case "tourplan":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tour Plan</h2>
            <TourPlanContent tourId={id} />
          </div>
        );
      case "location":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
            {tour.latitude && tour.longitude ? (
              <MapContent
                latitude={tour.latitude}
                longitude={tour.longitude}
                locationName={tour.location}
              />
            ) : (
              <p className="text-gray-500">Location data not available.</p>
            )}
            <p className="mt-2 text-gray-600">Location: {tour.location}</p>
          </div>
        );
      case "gallery":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <GalleryContent tourId={id} />
            </div>
          </div>
        );
      default:
        return <p>Invalid tab</p>;
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] flex items-center justify-center text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.main_image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="z-10">
          <p className="uppercase text-sm tracking-widest mb-2">Explore This Tour</p>
          <h1 className="text-5xl font-bold font-serif">{tour.title}</h1>
        </div>
      </section>

      {/* Tab Menu */}
      <div className="flex justify-center gap-6 flex-wrap mt-10 px-4">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 font-medium text-sm md:text-base transition 
              ${activeTab === tab.id
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600 hover:text-red-500"}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto my-16 px-4 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">{renderTabContent()}</div>
        <aside className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Your Tour</h2>
            <PlanTour tourId={tour.id} />
          </div>
        </aside>
      </div>

      <FooterSection />
    </>
  );
};

export default TourInfo;
