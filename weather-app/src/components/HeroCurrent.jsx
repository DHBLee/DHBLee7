import { useMemo } from "react";

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
            <h2 className="opacity-90 text-preset4">{locationName}</h2>
            <div className="text-preset6 opacity-70">
              {current.time
                ? new Date(current.time).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </div>
          </div>
          <div className="relative z-50 text-preset1 font-bold">
            {iconForHour(current.code, true)}
            {current.temp != null ? (
              <>
                {Math.round(current.temp)}
                <span className="text-preset4 opacity-90"> {cu.temperature_2m || "°"}</span>
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
    <div className="flex flex-col gap-5 justify-between rounded-xl text-Neutral200 border border-white/10 bg-Neutral800 p-3">
      <div className="text-preset6 opacity-85">{label}</div>
      <div className="mt-0.5 text-preset3">{value != null ? `${value} ${unit ?? ""}` : "—"}</div>
    </div>
  );
}
