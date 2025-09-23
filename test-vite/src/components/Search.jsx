import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

export function Search() {
  const { setByCountryName } = useWeather();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const query = input.trim();
    if (!query) return;
    setLoading(true);
    try {
      const { latitude, longitude, name } = await fetchCoordinates(query);
      setByCountryName(name, { latitude, longitude });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-5 md:gap-8 text-center">
      <h1 className="text-preset2">How's the sky looking today?</h1>
      <div className="lg:max-w-[60%] mx-auto flex flex-col md:flex-row w-full gap-2">
        <input
            type="text"
            placeholder="Search for a place..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full rounded-md border border-gray-400 p-2"
        />
        <button
            onClick={handleSearch}
            disabled={loading}
            className="mt-2 rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
            {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}


async function fetchCoordinates(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch geo data');
    const results = await response.json();
    if (results.length === 0) throw new Error('No location found');
    const { lat, lon, display_name } = results[0];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: display_name };
  }
  
