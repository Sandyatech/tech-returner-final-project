import React from "react";
import { CurrentWeatherData } from "../../files_backup/types";

interface CurrentWeatherProps {
    currentWeather?: CurrentWeatherData;
    locationName: string;
    localTime: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentWeather, locationName, localTime }) => {
    return (
        <div>
            <h2>Current weather in {locationName}</h2>
            <p>Local time: {localTime}</p>
            {currentWeather ? (
                <div className="card">
                    <p>Last updated: {currentWeather.last_updated}</p>
                    <p>Temperature: {currentWeather.temp_c}°C</p>
                    <p>Condition: {currentWeather.condition.text}</p>
                    <img src={currentWeather.condition.icon} alt={currentWeather.condition.text} />
                    <p>Wind speed: {currentWeather.wind_kph} km/h</p>
                    <p>Humidity: {currentWeather.humidity}%</p>
                    <p>Feels like: {currentWeather.feelslike_c}°C</p>
                    <p>UV index: {currentWeather.uv}</p>
                </div>
            ) : (
                <p>No current weather data available</p>
            )}
        </div>
    );
};

export default CurrentWeather;
