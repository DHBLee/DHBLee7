import { useEffect, useState, useMemo } from "react";
import { useWeather } from "../context/WeatherContext";
import { iconForHour } from "../utils/code";
import smallBg from "/assets/images/bg-today-small.svg";
import largeBg from "/assets/images/bg-today-large.svg";

export function HeroCurrent({ locationName, data }) {

  const current = useMemo(() => {
    const last = data?.hourly?.time?.length ? data.hourly.time.length - 1 : 0;
    return {
      code: data?.current?.weather_code ?? data?.daily?.weather_code?.[0],
      temp: data?.current?.temperature_2m ?? data?.hourly?.temperature_2m?.[last],
      feels: data?.current?.apparent_temperature ?? data?.hourly?.apparent_temperature?.[last],
      humid: data?.current?.relative_humidity_2m ?? data?.hourly?.relative_humidity_2m?.[last],
      wind: data?.current?.wind_speed_10m ?? data?.hourly?.wind_speed_10m?.[last],
      precip: data?.current?.precipitation ?? data?.hourly?.precipitation?.[last],
      time: data?.current?.time ?? data?.hourly?.time?.[last],
    };
  }, [data]);

  const cu = data?.current_units || {};

  return (
    <>
      <div className="relative rounded-2xl p-5 md:py-[85px]">
        <picture>
          <source media="(min-width: 768px)" srcSet={largeBg} />
          <img src={smallBg} alt="Bg image" className="rounded-2xl absolute inset-0 w-full h-full object-cover" />
        </picture>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="opacity-90">{locationName}</div>
            <div className="text-xs opacity-70">
              {current.time
                ? new Date(current.time).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </div>
          </div>
          <div className="relative z-50 text-6xl font-bold">
            {iconForHour(current.code, true)}
            {current.temp != null ? (
              <>
                {Math.round(current.temp)}
                <span className="text-2xl opacity-90"> {cu.temperature_2m || "°"}</span>
              </>
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KPI label="Feels like" value={current.feels} unit={(cu.apparent_temperature || cu.temperature_2m) ?? "°"} />
        <KPI label="Humidity" value={current.humid} unit={cu.relative_humidity_2m ?? "%"} />
        <KPI label="Wind" value={current.wind} unit={cu.wind_speed_10m ?? "km/h"} />
        <KPI label="Precipitation" value={current.precip} unit={cu.precipitation ?? "mm"} />
      </div>
    </>
  );
}

function KPI({ label, value, unit }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-xs opacity-85">{label}</div>
      <div className="mt-0.5 text-lg">{value != null ? `${value} ${unit ?? ""}` : "—"}</div>
    </div>
  );
}
