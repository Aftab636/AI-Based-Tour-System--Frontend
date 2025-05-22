import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import "../styles/updatePackage.css";

export default function UpdatePackage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("summer");
  const [tourType, setTourType] = useState("party");
  const [availability, setAvailability] = useState("");
  const [minGroupSize, setMinGroupSize] = useState("1");
  const [maxGroupSize, setMaxGroupSize] = useState("10");
  const [selectedTagUUIDs, setSelectedTagUUIDs] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [aiKeywords, setAiKeywords] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTags() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tags/`);
      if (res.ok) setAvailableTags(await res.json());
    }

    async function fetchTour() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tours/${id}/`);
      if (!res.ok) return setError("Failed to load tour.");
      const data = await res.json();
      setTitle(data.title || "");
      setDescription(data.description || "");
      setPricePerPerson(data.price_per_person || "");
      setDuration(data.duration || "");
      setLocation(data.location || "");
      setSeason(data.season || "summer");
      setTourType(data.tour_type || "party");
      setAvailability(data.availability || "");
      setMinGroupSize(data.min_group_size || "1");
      setMaxGroupSize(data.max_group_size || "10");
      setSelectedTagUUIDs(data.tags || []);
      setAiKeywords((data.ai_keywords || []).join(", "));
    }

    fetchTags();
    if (id) fetchTour();
  }, [id]);

  const handleTagChange = (tagId) => {
    setSelectedTagUUIDs((prev) =>
      prev.includes(tagId) ? prev.filter((tag) => tag !== tagId) : [...prev, tagId]
    );
  };

  const handleGalleryChange = (e) => {
    setGalleryFiles(Array.from(e.target.files).slice(0, 5));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price_per_person", pricePerPerson);
    formData.append("duration", duration);
    formData.append("location", location);
    formData.append("season", season);
    formData.append("tour_type", tourType);
    formData.append("availability", availability);
    formData.append("min_group_size", minGroupSize);
    formData.append("max_group_size", maxGroupSize);
    selectedTagUUIDs.forEach((tagId) => formData.append("tags", tagId));
    aiKeywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((keyword) => formData.append("ai_keywords", keyword));
    if (mainImage) formData.append("main_image", mainImage);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Authentication required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tours/${id}/`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        setError(errorMsg);
        toast.error("Failed to update tour.");
        setLoading(false);
        return;
      }

      if (galleryFiles.length) {
        const galleryData = new FormData();
        galleryFiles.forEach((file) => galleryData.append("image", file));
        const galRes = await fetch(
          `${import.meta.env.VITE_API_URL}/tours/${id}/upload-images/`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: galleryData,
          }
        );
        if (!galRes.ok) {
          const text = await galRes.text();
          toast.error(`Gallery upload failed: ${text}`);
          setLoading(false);
          return;
        }
        toast.success("Gallery images uploaded!");
      }

      toast.success("Tour updated successfully!");
      navigate("/managePackages");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">✨ Update Tour Package</h2>
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" required />
          <input type="number" placeholder="Price Per Person" value={pricePerPerson} onChange={(e) => setPricePerPerson(e.target.value)} className="input-field" />
          <input type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="input-field" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" />
          <select value={season} onChange={(e) => setSeason(e.target.value)} className="input-field">
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="autumn">Autumn</option>
          </select>
          <select value={tourType} onChange={(e) => setTourType(e.target.value)} className="input-field">
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural Immersion</option>
            <option value="historical">Historical</option>
            <option value="nature">Nature</option>
            <option value="beach">Beach</option>
            <option value="luxury">Luxury</option>
            <option value="party">Party</option>
          </select>
          <input type="text" placeholder="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className="input-field" />
          <input type="number" placeholder="Min Group Size" value={minGroupSize} onChange={(e) => setMinGroupSize(e.target.value)} className="input-field" />
          <input type="number" placeholder="Max Group Size" value={maxGroupSize} onChange={(e) => setMaxGroupSize(e.target.value)} className="input-field" />
        </div>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" rows="4" required />
        <input type="text" placeholder="AI Keywords (comma-separated)" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} className="input-field w-full" />

        <div>
          <label className="block font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {availableTags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer">
                <input type="checkbox" checked={selectedTagUUIDs.includes(tag.id)} onChange={() => handleTagChange(tag.id)} />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Main Image</label>
          <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} className="file-input" />
        </div>

        <div>
          <label className="block font-medium mb-2">Gallery Images (max 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
          {galleryFiles.length > 0 && (
            <p className="text-sm mt-1 text-gray-500">{galleryFiles.length} file{galleryFiles.length > 1 ? "s" : ""} selected</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 w-full"
        >
          {loading ? "Updating..." : "Update Tour"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
