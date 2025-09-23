import { createContext, useContext, useMemo, useState, useCallback } from "react";

const WeatherContext = createContext(null);

export function WeatherContextProvider({ children }) {
  // Independent unit states (no Apply button needed)
  const [temperatureUnit, setTemperatureUnit] = useState("celsius"); // API accepts celsius|fahrenheit [web:21]
  const [windUnit, setWindUnit] = useState("kmh");                   // API accepts kmh|mph|ms|kn [web:21]
  const [precipUnit, setPrecipUnit] = useState("mm");                // API accepts mm|inch [web:21]

  // Other UI prefs
  const [showDay, setShowDay] = useState("today"); // which day’s hourly slice to show [web:21]

  // Internals
  const [timezone] = useState("auto"); // map to local zone [web:29]
  const [lang] = useState("en");       // keep responses in English [web:21]

  // Location
  const [location, setLocation] = useState({
    name: "Berlin",
    latitude: 52.52,
    longitude: 13.41,
  }); // example default [web:21]

  // Simple history (optional)
  const [history, setHistory] = useState([]);
  const setLocationSafe = useCallback((loc) => {
    setLocation((prev) => {
      const next = typeof loc === "function" ? loc(prev) : loc;
      return next;
    });
    setHistory((h) => [...h, { at: Date.now(), loc }]);
  }, []); // stable setter [web:21]
  const setByCountryName = useCallback((name, coords) => {
    setLocationSafe({ name, ...coords });
  }, [setLocationSafe]); // helper [web:21]

  // Build API params (depend on unit states so changes refetch)
  const requestParams = useMemo(() => {
    const hourly = [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "precipitation_probability",
      "weather_code",
      "is_day",
    ].join(","); // hourly variables used by UI [web:21]

    const daily = [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "wind_speed_10m_max",
      "sunrise",
      "sunset",
    ].join(","); // daily variables for 7-day cards and day/night [web:21]

    const current = [
      "temperature_2m",
      "apparent_temperature",
      "wind_speed_10m",
    ].join(","); // current summary [web:21]

    return {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone,
      lang,
      current,
      hourly,
      daily,
      temperature_unit: temperatureUnit,
      wind_speed_unit: windUnit,
      precipitation_unit: precipUnit,
    }; // Open-Meteo applies these unit conversions on the server [web:21]
  }, [location, timezone, lang, temperatureUnit, windUnit, precipUnit]); // include unit states in deps [web:21]

  const value = useMemo(() => ({
    // public prefs
    prefs: { temperatureUnit, windUnit, precipUnit, showDay },
    // setters
    setTemperatureUnit, setWindUnit, setPrecipUnit, setShowDay,
    // internals
    internals: { lang, timezone },
    // data
    location, history, requestParams,
    // location helpers
    setLocation: setLocationSafe,
    setByCountryName,
  }), [
    temperatureUnit, windUnit, precipUnit, showDay,
    lang, timezone, location, history, requestParams,
    setLocationSafe, setByCountryName,
  ]); // ensure consumers update on unit changes [web:21]

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  ); // context provider [web:21]
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within a WeatherContextProvider"); // safety [web:21]
  return ctx;
}

export default WeatherContext;
