import Image from "next/image";
import WeatherPage from "./weather/page";

export default function Home() {
  return (
    <div>
        <h1>Weather App</h1>
        <WeatherPage />
    </div>
  );
}
