import { useMemo } from "react";
import { iconForDay } from "../utils/code";

export function DailyStrip({ data, onPick }) {

  // Parse days array from API response
  const days = useMemo(() => {
    if (!data?.daily?.time) return [];
    return data.daily.time.map((t, i) => ({
      date: t,
      code: data.daily.weather_code?.[i],
      tmax: data.daily.temperature_2m_max?.[i],
      tmin: data.daily.temperature_2m_min?.[i],
      psum: data.daily.precipitation_sum?.[i],
      wmax: data.daily.wind_speed_10m_max?.[i],
    }));
  }, [data]);

  // Get daily units for temperatures
  const du = data?.daily_units || {};


  return (
    <div className="mt-4">
      <h3 className="my-3">Daily forecast</h3>
      <ul className="flex flex-wrap gap-3 list-none p-0">
        {days.slice(0, 7).map((d) => (
          <li
            key={d.date}
            onClick={() => onPick(d.date)}
            className="flex flex-col max-w-[80px] w-full gap-2 items-center cursor-pointer rounded-xl border border-[#232657] bg-[#12153a] py-2 px-2"
          >
            <div className="text-xs opacity-85">
              {new Date(d.date).toLocaleDateString(undefined, { weekday: "short" })}
            </div>
            <div className="text-2xl">{iconForDay(d.code)}</div>
            <div className="flex w-full justify-between text-xs">
              <span>
                {Math.round(d.tmax)}
                {du.temperature_2m_max || "°"}
              </span>
              <span>
                {Math.round(d.tmin)}
                {du.temperature_2m_min || "°"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
