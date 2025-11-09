import { useMemo } from "react";
import { iconForHour } from "../utils/code";

export function HourlyList({ data, onChange, value }) {
  
  // Compute days and daily selection
  const days = useMemo(() => {
    if (!data?.daily?.time) return [];
    return data.daily.time.map(t => t);
  }, [data]);

  const selectedDay = useMemo(() => {
    if (!days.length) return null;
    if (value === "today") return days[0];
    if (value === "tomorrow") return days[1] ?? days[0];
    return days.find(d => d === value) ?? days[0];
  }, [value, days]);

  // Filter hourly data for selected day from 3pm to 10pm
  const hours = useMemo(() => {
    if (!selectedDay || !data?.hourly?.time?.length) return [];
    const out = [];
    for (let i = 0; i < data.hourly.time.length; i++) {
      const dt = new Date(data.hourly.time[i]);
      const dayIso = dt.toISOString().slice(0, 10);
      const hh = dt.getHours();
      if (dayIso === selectedDay && hh >= 15 && hh <= 22) {
        out.push({
          i,
          t: dt,
          temp: data.hourly.temperature_2m?.[i],
        });
      }
    }
    return out;
  }, [selectedDay, data]);

  const hu = data?.hourly_units || {};
  const hourCodes = data?.hourly?.weather_code || [];
  const hourIsDay = data?.hourly?.is_day || [];

  return (
    <div className="rounded-2xl border border-[#232657] bg-Neutral800 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="m-0 text-preset5">Hourly forecast</h3>
        <select
          aria-label="Select day"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="rounded-lg border border-[#2b2e4a] text-preset7 bg-Neutral600 px-2 py-1 text-white"
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          {days.slice(2, 7).map(d => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString(undefined, { weekday: "short" })}
            </option>
          ))}
        </select>
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {hours.length ? hours.map((h, i) => {
            const code = hourCodes[h.i];
            const isDay = Boolean(hourIsDay[h.i]);
            return (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-[#232657] bg-Neutral600 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="text-lg">{iconForHour(code, isDay)}</div>
                  <div className="opacity-90">
                    {h.t.toLocaleTimeString([], { hour: "numeric" })}
                  </div>
                </div>
                <div className="text-right font-semibold">
                  {h.temp != null ? `${Math.round(h.temp)}${hu.temperature_2m || "°"}` : "—"}
                </div>
              </li>
            );
          }) : <li>No hourly data for 3–10pm.</li>}
      </ul>
    </div>
  );
}
