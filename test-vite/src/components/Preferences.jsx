import { useWeather } from "../context/WeatherContext";

export default function Preferences() {
    const { prefs, setUnits, setShowDay, setLang } = useWeather()
    return (
        <section>
            <label htmlFor="">
                Units:
                <select name="units" id="units" value={prefs.units} onChange={(e) => setUnits(e.target.value)}>
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                </select>
            </label>
            <label htmlFor="">
                Show:
                <select name="showDay" id="showDay" value={prefs.showDay} onChange={(e) => setShowDay(e.target.value)}>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="friday">Friday</option>
                    <option value="week">Week</option>
                </select>
            </label>
            <label htmlFor="">
                Language:
                <select name="lang" id="lang" value={prefs.lang} onChange={(e) => setLang(e.target.value)}>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
            </label>
        </section>
    )
}