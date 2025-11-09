import { useWeather } from "../context/WeatherContext";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { HeroCurrent } from "./HeroCurrent";
import { DailyStrip } from "./DailyStrip";
import { HourlyList } from "./HourlyList";
import { Search } from "./Search";

export default function WeatherView() {
  const { location, prefs, requestParams, setShowDay, setLocation } = useWeather();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user's location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode using Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          // Update context with user's actual location
          setLocation({
            name: data.address.city || data.address.town || data.address.village || "Current Location",
            latitude,
            longitude,
          });
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          // Fallback: set coordinates without name
          setLocation({
            name: "Current Location",
            latitude,
            longitude,
          });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Keep default Berlin location if geolocation fails
      }
    );
  }, []); // Run only once on mount

  // Fetch weather data when requestParams change
  useEffect(() => {
    const controller = new AbortController();
    const sp = new URLSearchParams(requestParams);
    const url = `https://api.open-meteo.com/v1/forecast?${sp.toString()}`;
    
    (async () => {
      try {
        setError(null);
        setData(null);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e.name !== "AbortError") setError(String(e?.message ?? e));
      }
    })();
    
    return () => controller.abort();
  }, [requestParams]);

  return (
    <main className="space-y-6 lg:space-y-10 mx-auto max-w-[1100px] min-h-screen text-white p-2 md:p-4">
      <Header/>
      <Search />
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] w-full gap-5">
        <section className="flex flex-col justify-between">
          <HeroCurrent data={data} locationName={location.name} />
          <DailyStrip data={data} onPick={setShowDay} />
        </section>
        <aside>
          <HourlyList data={data} onChange={setShowDay} value={prefs.showDay} />
        </aside>
      </div>
    </main>
  );
}
