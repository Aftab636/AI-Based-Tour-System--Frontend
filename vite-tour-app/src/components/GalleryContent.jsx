// src/components/GalleryContent.jsx
import { useEffect, useState } from "react";

function GalleryContent({ tourId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tours/${tourId}/gallery/`);
        if (!res.ok) throw new Error("Failed to fetch gallery images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    }

    if (tourId) {
      fetchGallery();
    }
  }, [tourId]);

  if (loading) {
    return <p className="text-gray-500">Loading gallery...</p>;
  }

  if (images.length === 0) {
    return <p className="text-gray-400">No gallery images found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-sm">
          <img
            src={img.image || img} // Adjust if backend returns { image: "url" }
            alt={`Gallery image ${index + 1}`}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default GalleryContent;
