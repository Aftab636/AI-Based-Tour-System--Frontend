// src/services/recommendation.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * POST user preferences for recommendations
 */
export async function getRecommendations(preferences, token) {
  const { method = "hybrid" } = preferences;

  if (!["content", "hybrid", "popular"].includes(method)) {
    throw new Error("Invalid recommendation method. Must be one of: content, hybrid, popular.");
  }

  if (!token) {
    throw new Error("Authorization token missing. Please login again.");
  }

  try {
    const res = await axios.post(
      `${API_URL}/api/recommend/${method}/`,
      preferences,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      recommendations: res.data.recommendations || [],
      method_used: method,
      generated_at: new Date().toISOString(),
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(error.response?.data?.message || "Failed to get recommendations.");
  }
}

/**
 * GET popular tours
 */
export async function getPopularTours() {
  try {
    const res = await axios.get(`${API_URL}/api/recommend/popular/`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch popular tours:", error);
    throw new Error("Failed to fetch popular tours.");
  }
}
