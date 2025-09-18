// app/page.tsx

// This function fetches the data
async function getWeather() {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m',
      {
        // Revalidate the data every hour
        next: { revalidate: 3600 },
      }
    );
  
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }
  
    return res.json();
  }
  
  // This is an async Server Component
  export default async function WeatherPage() {
    const data = await getWeather();
  
    const { temperature_2m } = data.current;
  
    return (
      <main>
        <h1>Current Weather in Berlin</h1>
        <p>Temperature: {temperature_2m}°C</p>
      </main>
    );
  }