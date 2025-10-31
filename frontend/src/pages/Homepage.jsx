import React, { useEffect, useState, useMemo } from "react";
import TourCards from "../components/TourCards";

function HomePage({ query = "" }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(`${API_BASE}/experiences`);
        const data = await res.json();
        if (data && data.success) {
          setTours(data.data || []);
        } else {
          setError("Failed to load experiences");
        }
      } catch (err) {
        console.error(err);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // filter tours by query (title or category)
  const filteredTours = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return tours;
    return tours.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const category = (t.category || "").toLowerCase();
      const short = (t.shortDescription || "").toLowerCase();
      return title.includes(q) || category.includes(q) || short.includes(q);
    });
  }, [tours, query]);

  return (
    <div className="pt-10 pb-20 flex flex-col gap-10 justify-start bg-white min-h-screen">

      {loading ? (
        <p className="text-gray-500 text-sm">Loading experiences...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : filteredTours.length === 0 ? (
        <p className="text-gray-500 text-sm">No experiences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <TourCards
              key={tour._id}
              id={tour._id}
              image={Array.isArray(tour.images) ? (tour.images[0]?.url || tour.images[0]) : ""} 
              title={tour.title}
              location={tour.category || ""}
              shortdescription={tour.shortDescription || ""}
              price={tour.price || 999}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
