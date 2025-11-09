// src/context/WeatherContext.jsx
import { createContext, useContext, useMemo, useState, useCallback } from "react";

// ============================================================
// 1. PREFERENCES CONTEXT (Units + UI prefs)
// ============================================================
const PreferencesContext = createContext(null);
const PreferencesSetterContext = createContext(null);

function PreferencesProvider({ children }) {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");
  const [showDay, setShowDay] = useState("today");

  // Stable state object
  const prefs = useMemo(() => ({
    temperatureUnit,
    windUnit,
    precipUnit,
    showDay,
  }), [temperatureUnit, windUnit, precipUnit, showDay]);

  // Stable setters object
  const setters = useMemo(() => ({
    setTemperatureUnit,
    setWindUnit,
    setPrecipUnit,
    setShowDay,
  }), []);

  return (
    <PreferencesContext.Provider value={prefs}>
      <PreferencesSetterContext.Provider value={setters}>
        {children}
      </PreferencesSetterContext.Provider>
    </PreferencesContext.Provider>
  );
}

// ============================================================
// 2. LOCATION CONTEXT
// ============================================================
const LocationContext = createContext(null);
const LocationSetterContext = createContext(null);

function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    name: "Berlin",
    latitude: 52.52,
    longitude: 13.41,
  });

  const [history, setHistory] = useState([]);

  // Stable setter with history tracking
  const setLocationSafe = useCallback((loc) => {
    setLocation((prev) => {
      const next = typeof loc === "function" ? loc(prev) : loc;
      return next;
    });
    setHistory((h) => [...h, { at: Date.now(), loc }]);
  }, []);

  // Helper for setting by country name
  const setByCountryName = useCallback((name, coords) => {
    setLocationSafe({ name, ...coords });
  }, [setLocationSafe]);

  // Stable location state
  const locationData = useMemo(() => ({
    location,
    history,
  }), [location, history]);

  // Stable setters
  const locationSetters = useMemo(() => ({
    setLocation: setLocationSafe,
    setByCountryName,
  }), [setLocationSafe, setByCountryName]);

  return (
    <LocationContext.Provider value={locationData}>
      <LocationSetterContext.Provider value={locationSetters}>
        {children}
      </LocationSetterContext.Provider>
    </LocationContext.Provider>
  );
}

// ============================================================
// 3. API PARAMS CONTEXT (Computed from preferences + location)
// ============================================================
const ApiParamsContext = createContext(null);

function ApiParamsProvider({ children }) {
  const { temperatureUnit, windUnit, precipUnit } = usePreferences();
  const { location } = useLocation();

  const [timezone] = useState("auto");
  const [lang] = useState("en");

  // Build API params (recomputes when units or location change)
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
    ].join(",");

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
    ].join(",");

    const current = [
      "temperature_2m",
      "apparent_temperature",
      "wind_speed_10m",
    ].join(",");

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
    };
  }, [location, timezone, lang, temperatureUnit, windUnit, precipUnit]);

  const value = useMemo(() => ({
    requestParams,
    internals: { lang, timezone },
  }), [requestParams, lang, timezone]);

  return (
    <ApiParamsContext.Provider value={value}>
      {children}
    </ApiParamsContext.Provider>
  );
}

// ============================================================
// COMBINED PROVIDER (Composition Pattern)
// ============================================================
export function WeatherContextProvider({ children }) {
  return (
    <PreferencesProvider>
      <LocationProvider>
        <ApiParamsProvider>
          {children}
        </ApiParamsProvider>
      </LocationProvider>
    </PreferencesProvider>
  );
}

// ============================================================
// CUSTOM HOOKS (Granular access to prevent unnecessary re-renders)
// ============================================================

// Preferences hooks
export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within WeatherContextProvider");
  return ctx;
}

export function usePreferencesSetters() {
  const ctx = useContext(PreferencesSetterContext);
  if (!ctx) throw new Error("usePreferencesSetters must be used within WeatherContextProvider");
  return ctx;
}

// Location hooks
export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within WeatherContextProvider");
  return ctx;
}

export function useLocationSetters() {
  const ctx = useContext(LocationSetterContext);
  if (!ctx) throw new Error("useLocationSetters must be used within WeatherContextProvider");
  return ctx;
}

// API params hook
export function useApiParams() {
  const ctx = useContext(ApiParamsContext);
  if (!ctx) throw new Error("useApiParams must be used within WeatherContextProvider");
  return ctx;
}

// Legacy hook for backward compatibility (use sparingly)
export function useWeather() {
  const prefs = usePreferences();
  const prefsSetters = usePreferencesSetters();
  const location = useLocation();
  const locationSetters = useLocationSetters();
  const apiParams = useApiParams();

  return {
    prefs,
    ...prefsSetters,
    ...location,
    ...locationSetters,
    ...apiParams,
  };
}
