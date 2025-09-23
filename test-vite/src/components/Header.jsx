// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import logoImg from "/assets/images/logo.svg";
import { useWeather } from "../context/WeatherContext";
import iconUnits from "/assets/images/icon-units.svg";
import iconDropdown from "/assets/images/icon-dropdown.svg";
import UnitButton from "../UI/UnitButton";
export function Header() {
  const {
    prefs: { temperatureUnit, windUnit, precipUnit },
    setTemperatureUnit,
    setWindUnit,
    setPrecipUnit,
  } = useWeather(); // read/write unit states from context [web:21]

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]); // robust outside-click handler [web:181]

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]); // keyboard escape to close [web:195]

  // Selection handlers: update units and keep menu open (like the mock)
  const chooseTemp = (val) => setTemperatureUnit(val); // triggers refetch via requestParams change [web:21]
  const chooseWind = (val) => setWindUnit(val);
  const choosePrec = (val) => setPrecipUnit(val);

  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo" className="h-6 w-auto" />
      </div>

      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white backdrop-blur hover:bg-white/20"
        >
          <img src={iconUnits} alt="Unit Icon" />
          Units
          <img src={iconDropdown} alt="Dropdown Icon" />
        </button>

        {open && (
          <div
            ref={menuRef}
            role="menu"
            aria-label="Units menu"
            className="absolute right-0 z-50 mt-2 w-72 rounded-lg border border-white/10 bg-[#0d1021] p-3 shadow-xl"
          >
            <div className="mb-2 text-sm opacity-80">Switch to Imperial</div>

            {/* Temperature */}
            <div className="mb-2 border-b border-white/10 pb-2">
              <div className="mb-1 text-xs opacity-80">Temperature</div>
              <div className="space-y-1">
                <UnitButton active={temperatureUnit === "celsius"} onClick={() => chooseTemp("celsius")} label="Celsius (°C)" />
                <UnitButton active={temperatureUnit === "fahrenheit"} onClick={() => chooseTemp("fahrenheit")} label="Fahrenheit (°F)" />
              </div>
            </div>

            {/* Wind Speed */}
            <div className="mb-2 border-b border-white/10 pb-2">
              <div className="mb-1 text-xs opacity-80">Wind Speed</div>
              <div className="space-y-1">
                <UnitButton active={windUnit === "kmh"} onClick={() => chooseWind("kmh")} label="km/h" />
                <UnitButton active={windUnit === "mph"} onClick={() => chooseWind("mph")} label="mph" />
              </div>
            </div>

            {/* Precipitation */}
            <div>
              <div className="mb-1 text-xs opacity-80">Precipitation</div>
              <div className="space-y-1">
                <UnitButton active={precipUnit === "mm"} onClick={() => choosePrec("mm")} label="Millimeters (mm)" />
                <UnitButton active={precipUnit === "inch"} onClick={() => choosePrec("inch")} label="Inches (in)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
