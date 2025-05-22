import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddPackage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/tags/`)
      .then((res) => res.json())
      .then((data) => {
        const tags = Array.isArray(data.results) ? data.results : data;
        setAvailableTags(tags);
      })
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  const onSubmit = async (data) => {
    setSubmissionError("");
    setSubmissionSuccess(false);

    const formData = new FormData();
    for (const key in data) {
      if (key === "tags") {
        data.tags.forEach((tag) => formData.append("tags", tag));
      } else if (key === "ai_keywords") {
        data.ai_keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
          .forEach((k) => formData.append("ai_keywords", k));
      } else {
        formData.append(key, data[key]);
      }
    }
    if (mainImage) formData.append("main_image", mainImage);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setSubmissionError("Authentication required. Please log in.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/tours/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const tour = await res.json();

      if (galleryImages.length) {
        const imgData = new FormData();
        galleryImages.forEach((img) => imgData.append("images", img));
        await fetch(`${apiUrl}/api/tours/${tour.id}/upload-images/`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imgData,
        });
      }

      setSubmissionSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setSubmissionError(err.message || "Failed to submit package");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl space-y-6 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Add New Tour Package
        </h2>

        {submissionSuccess && <div className="text-green-600 text-center">✅ Package created successfully!</div>}
        {submissionError && <div className="text-red-600 text-center">❌ {submissionError}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input {...register("title", { required: true })} placeholder="Title *" className="input" />
          <input {...register("location", { required: true })} placeholder="Location *" className="input" />
          <input {...register("price_per_person", { required: true })} type="number" placeholder="Price per person *" className="input" />
          <input {...register("duration")} type="number" placeholder="Duration (in days)" className="input" />
          <input {...register("availability")} type="number" placeholder="Availability" className="input" />
          <input {...register("ai_keywords")} placeholder="AI Keywords (comma-separated)" className="input" />
          <input {...register("min_group_size")} type="number" placeholder="Min Group Size" className="input" />
          <input {...register("max_group_size")} type="number" placeholder="Max Group Size" className="input" />
        </div>

        <textarea {...register("description")} placeholder="Tour Description" className="input h-32 resize-y" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select {...register("season")} className="input">
            <option value="">Select Season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="monsoon">Monsoon</option>
            <option value="spring">Spring</option>
          </select>

          <select {...register("tourType")} className="input">
            <option value="">Select Tour Type</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="historical">Historical</option>
            <option value="nature">Nature</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city_tour">City Tour</option>
            <option value="foodie">Food</option>
            <option value="luxury">Luxury</option>
            <option value="party">Party</option>
            <option value="family">Family</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {availableTags.map((tag) => (
              <label key={tag.id} className="inline-flex items-center space-x-2">
                <input type="checkbox" value={tag.id} {...register("tags")} className="accent-red-500" />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Main Image</label>
            <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="input" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Gallery Images (max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setGalleryImages(Array.from(e.target.files).slice(0, 5))}
              className="input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-3 rounded-lg transition"
        >
          {isSubmitting ? "Saving..." : "Save Tour Package"}
        </button>
      </form>
    </div>
  );
}
