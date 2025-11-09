// WMO → daily emoji (coarse categories)
export function iconForDay(wmo) {
    if (wmo === 0) return "☀️";               // Clear sky
    if ([1, 2].includes(wmo)) return "🌤️";     // Mainly clear / partly cloudy
    if ([3].includes(wmo)) return "⛅";         // Overcast / cloudy
    if ([45, 48].includes(wmo)) return "🌫️";   // Fog
    if ([51, 53, 55, 56, 57].includes(wmo)) return "🌦️"; // Drizzle / freezing drizzle
    if ([61, 63, 65, 80, 81, 82].includes(wmo)) return "🌧️"; // Rain / showers
    if ([66, 67].includes(wmo)) return "🌧️❄️"; // Freezing rain
    if ([71, 73, 75, 77, 85, 86].includes(wmo)) return "❄️"; // Snow / snow showers
    if ([95, 96, 99].includes(wmo)) return "⛈️"; // Thunderstorm
    return "🌡️"; // Unknown
  }
  

  // Provide isDay boolean and wmo code per hour
export function iconForHour(wmo, isDay) {
    // Night variants for clear/partly cloudy
    if (wmo === 0) return isDay ? "☀️" : "🌕";
    if ([1, 2].includes(wmo)) return isDay ? "🌤️" : "🌙☁️";
    if ([3].includes(wmo)) return "☁️";
    if ([45, 48].includes(wmo)) return "🌫️";
    if ([51, 53, 55, 56, 57].includes(wmo)) return isDay ? "🌦️" : "🌧️";
    if ([61, 63, 65, 80, 81, 82].includes(wmo)) return "🌧️";
    if ([66, 67].includes(wmo)) return "🌧️❄️";
    if ([71, 73, 75, 77, 85, 86].includes(wmo)) return "❄️";
    if ([95, 96, 99].includes(wmo)) return "⛈️";
    return "🌡️";
  }
  