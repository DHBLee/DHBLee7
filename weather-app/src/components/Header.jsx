// src/components/Header.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import logoImg from "/assets/images/logo.svg";
import { usePreferences, usePreferencesSetters } from "../context/WeatherContext";
import iconUnits from "/assets/images/icon-units.svg";
import iconDropdown from "/assets/images/icon-dropdown.svg";
import UnitButton from "../UI/UnitButton";

export function Header() {
  // Only subscribe to what you need
  const { temperatureUnit, windUnit, precipUnit } = usePreferences();
  const { setTemperatureUnit, setWindUnit, setPrecipUnit } = usePreferencesSetters();

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Combined event listeners
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      const t = e.target;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Memoized handlers
  const chooseTemp = useCallback((val) => {
    setTemperatureUnit(val);
  }, [setTemperatureUnit]);

  const chooseWind = useCallback((val) => {
    setWindUnit(val);
  }, [setWindUnit]);

  const choosePrec = useCallback((val) => {
    setPrecipUnit(val);
  }, [setPrecipUnit]);

  const setImperial = useCallback(() => {
    setTemperatureUnit("fahrenheit");
    setWindUnit("mph");
    setPrecipUnit("inch");
  }, [setTemperatureUnit, setWindUnit, setPrecipUnit]);

  const setMetric = useCallback(() => {
    setTemperatureUnit("celsius");
    setWindUnit("kmh");
    setPrecipUnit("mm");
  }, [setTemperatureUnit, setWindUnit, setPrecipUnit]);

  const isImperial = temperatureUnit === "fahrenheit" && windUnit === "mph" && precipUnit === "inch";
  const isMetric = temperatureUnit === "celsius" && windUnit === "kmh" && precipUnit === "mm";

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
          className="text-preset7 flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white backdrop-blur hover:bg-white/20"
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
            className="absolute right-0 z-100 mt-2 w-72 rounded-lg border border-white/10 bg-[#0d1021] p-3 shadow-xl"
          >
            <div className="mb-3 border-b border-white/10 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={isMetric ? setImperial : setMetric}
                  className="flex-1 rounded-lg px-3 py-2 text-preset7 transition bg-white/5 text-white/70 hover:bg-white/10"
                >
                  Switch to {isMetric ? "Imperial" : "Metric"}
                </button>
              </div>
            </div>

            <div className="mb-2 border-b border-white/10 pb-2">
              <div className="mb-1 text-preset8 text-Neutral300 opacity-80">Temperature</div>
              <div className="space-y-1">
                <UnitButton 
                  active={temperatureUnit === "celsius"} 
                  onClick={() => chooseTemp("celsius")} 
                  label="Celsius (°C)" 
                />
                <UnitButton 
                  active={temperatureUnit === "fahrenheit"} 
                  onClick={() => chooseTemp("fahrenheit")} 
                  label="Fahrenheit (°F)" 
                />
              </div>
            </div>

            <div className="mb-2 border-b border-white/10 pb-2">
              <div className="mb-1 text-preset8 text-Neutral300 opacity-80">Wind Speed</div>
              <div className="space-y-1">
                <UnitButton 
                  active={windUnit === "kmh"} 
                  onClick={() => chooseWind("kmh")} 
                  label="km/h" 
                />
                <UnitButton 
                  active={windUnit === "mph"} 
                  onClick={() => chooseWind("mph")} 
                  label="mph" 
                />
              </div>
            </div>

            <div>
              <div className="mb-1 text-preset8 text-Neutral300 opacity-80">Precipitation</div>
              <div className="space-y-1">
                <UnitButton 
                  active={precipUnit === "mm"} 
                  onClick={() => choosePrec("mm")} 
                  label="Millimeters (mm)" 
                />
                <UnitButton 
                  active={precipUnit === "inch"} 
                  onClick={() => choosePrec("inch")} 
                  label="Inches (in)" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
