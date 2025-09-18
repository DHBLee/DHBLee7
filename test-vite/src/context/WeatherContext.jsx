import { createContext, useContext, useMemo, useState } from "react";

const WeatherContext = createContext(null);

export function WeatherContextProvider({ children}) {
    
    const [units, setUnits] = useState("metric")
    const [lang, setLang] = useState("en")
    const [timezone, setTimezone] = useState("auto")
    const [showDay, setShowDay] = useState('today')

    const [location, setLocation] = useState({
        name: 'Berlin',
        latitude: 52.52,
        longitude: 13.41,
    });

    const requestParams = useMemo(() => {
        const params = {
            latitude: location.latitude,
            longitude: location.longitude,
            current: 'temperature_2m,wind_speed_10m',
            hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
            timezone,
            ...(units === 'imperial' ? {
                temperature_unit: 'fahrenheit', wind_speed_unit: 'mph',
            } : {
                temperature_unit: 'celsius', wind_speed_unit: 'kmh',
            }),
            lang,
        }
        return params
    }, [location, units, lang, timezone]);

    const value = useMemo(
        () => ({
            prefs: { units, lang, timezone, showDay },
            location,
            history,
            requestParams,
            setUnits,
            setLang,
            setTimezone,
            setShowDay,
            setLocation: (loc) => { setLocation(loc); },
            setByCountryName: (name, coords) => {
                setLocation({ name, ...coords})
            },
        }),
        [units, lang, timezone, showDay, location, history, requestParams]
    )

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}

export function useWeather() {
    const cxt = useContext(WeatherContext)
    if (!cxt) {
        throw new Error('useWeatherContext must be used within a WeatherContextProvider')
    }
    return cxt
}

export default WeatherContext;