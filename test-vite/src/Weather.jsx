// src/App.jsx
import { useEffect, useState } from 'react'
import Preferences from './components/Preferences'
import Weatherview from './components/WeatherView'

export default function WeatherPage() {
  const [temp, setTemp] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&timezone=auto'

    async function load() {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setTemp(data.current?.temperature_2m ?? null)
      } catch (e) {
        setErr(String(e?.message ?? e))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <main>Loading…</main>
  if (err) return <main>Error: {err}</main>
  return (
    <main>
        <Preferences />
        <Weatherview /> 
      <h1>Current Weather in Berlin</h1>
      <p>Temperature: {temp}°C</p>
    </main>
  )
}
