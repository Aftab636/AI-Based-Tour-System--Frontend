import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationForm from "../components/RecommendationForm";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

export default function PreferencePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      setAccessToken(token);
    }
  }, [navigate]);

  const handleSubmit = async (preferences) => {
    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const savePrefsEndpoint = `${backendUrl}/api/user/preferences/`;

      const savePrefsRes = await fetch(savePrefsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferences),
      });

      if (!savePrefsRes.ok) {
        const errorData = await savePrefsRes.json().catch(() => ({}));
        setError(errorData.error || `Failed to save preferences: ${savePrefsRes.statusText}`);
        setLoading(false);
        return;
      }

      const method = preferences.method || "hybrid";
      const recommendEndpoint = `${import.meta.env.VITE_API_URL}/api/recommend/${method}/`;

      const res = await fetch(recommendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferences),
      });

      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        sessionStorage.clear();
        navigate("/login");
        return;
      }

      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : { success: false, error: "Unexpected response format." };

      if (res.ok && data.recommendations) {
        sessionStorage.setItem("tourRecommendations", JSON.stringify(data.recommendations));
        navigate("/recommendations/results");
      } else {
        setError(data.error || "Failed to get recommendations.");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-6 py-12">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-red-200">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
            Your Travel Preferences
          </h1>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300 shadow-sm">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {loading && (
            <div className="mb-4 p-4 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 shadow-sm">
              <p>Processing your preferences...</p>
            </div>
          )}

          <RecommendationForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>

      <FooterSection />
    </>
  );
}
