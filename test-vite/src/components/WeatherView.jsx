import { useWeather } from "../context/WeatherContext";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { HeroCurrent } from "./HeroCurrent";
import { DailyStrip } from "./DailyStrip";
import { HourlyList } from "./HourlyList";
import { Search } from "./Search";

export default function WeatherView() {
  const { location, prefs, requestParams, setShowDay } = useWeather();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
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
    <main className="space-y-6 lg:space-y-10 mx-auto max-w-[1200px] min-h-screen text-white p-2 md:p-4">
      <Header/>
      <Search />
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] w-full gap-3">
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
