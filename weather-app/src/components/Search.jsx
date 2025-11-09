import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useWeather } from "../context/WeatherContext";

export function Search() {
  const { setByCountryName } = useWeather();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search for suggestions
  const fetchSuggestions = useCallback(async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setSearchInProgress(false);
      return;
    }

    setSearchInProgress(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=10&addressdetails=1`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const results = await response.json();
      
      // Format results to show city/location names
      const formattedResults = results.map((result) => ({
        id: result.place_id,
        name: result.display_name,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      }));
      
      setSuggestions(formattedResults);
      setShowDropdown(formattedResults.length > 0);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setSearchInProgress(false);
    }
  }, []);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Memoized debounced function
  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, 500),
    [fetchSuggestions]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim().length >= 2) {
      setSearchInProgress(true);
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
      setSearchInProgress(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion.name);
    setByCountryName(suggestion.name, {
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
    });
    setShowDropdown(false);
    setSuggestions([]);
  };

  // Handle manual search
  const handleSearch = async () => {
    const query = input.trim();
    if (!query) return;
    
    setLoading(true);
    setShowDropdown(false);
    
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
      
      <div className="lg:max-w-[60%] mx-auto flex flex-col md:flex-row w-full gap-2 relative" ref={dropdownRef}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for a place..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="bg-Neutral800 w-full rounded-xl border border-gray-400 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Search icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Loading indicator inside input */}
          {searchInProgress && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Dropdown suggestions */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-md shadow-lg z-100 max-h-[240px] overflow-y-auto">
              {searchInProgress && suggestions.length === 0 ? (
                <div className="px-4 py-3 text-gray-300 text-sm flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span>Search in progress</span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="py-1">
                  {suggestions.slice(0, 4).map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-left text-gray-200 text-sm transition-colors"
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-gray-400 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-xl bg-Blue500 text-white px-4 py-2 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}

async function fetchCoordinates(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&limit=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch geo data");
  const results = await response.json();
  if (results.length === 0) throw new Error("No location found");
  const { lat, lon, display_name } = results[0];
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    name: display_name,
  };
}
