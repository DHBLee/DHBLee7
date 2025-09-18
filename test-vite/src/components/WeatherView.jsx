import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Weatherview() {
    const { requestParams, location } = useWeather();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const controller = new AbortController();
        const sp = new URLSearchParams(requestParams);
        const url = `https://api.open-meteo.com/v1/forecast?${sp.toString()}`;
        (async () => {
            try {
                const res = await fetch(url, { signal: controller.signal })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                setData(data)
            } catch (e) {
                setError(String(e?.message ?? e))
            } finally {
                controller.abort()
            }
        })()
    }, [requestParams])

    if (error) return <main>Error: {error}</main>
    if (!data) return <main>Loading…</main>
    return (
        <main>
            <h1>Current Weather in {location.name}</h1>
            <p>Temperature: {data.current?.temperature_2m}°C</p>
        </main>
    )
}