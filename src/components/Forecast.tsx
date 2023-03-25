import React, { useState } from "react";
import axios from "axios";
import "../App.css";

interface WeatherData {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
}

interface CurrentWeatherData {
    last_updated: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
}

interface LocationData {
    name: string;
    region: string;
    country: string;
    localtime: string;
}

function Forecast() {
    const [location, setLocation] = useState("");
    const [forecast, setForecast] = useState<{ forecastday: WeatherData[] }>();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
    const [locationData, setLocationData] = useState<LocationData>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            method: "GET",
            url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
            params: { q: location, days: "7" },
            headers: {
                "X-RapidAPI-Key":
                    "92b61d7045msh8d56720ae538310p1e2cfbjsn9e998da755fd",
                "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setForecast(response.data.forecast);
            setCurrentWeather(response.data.current);
            setLocationData(response.data.location);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>3 Day Weather Forecast</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                />
                <button type="submit">Get Forecast</button>
            </form>
            {forecast && (
                <ul className="container">
                    {forecast.forecastday.map((day: WeatherData) => (
                        <li key={day.date} className="card">
                            <p>Date: {day.date}</p>
                            <p>Max Temp: {day.day.maxtemp_c}</p>
                            <p>Min Temp: {day.day.mintemp_c}</p>
                            <p>Condition: {day.day.condition.text}</p>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                        </li>
                    ))}
                </ul>
            )}

            {locationData && (
                <div>
                    <h2>Current weather in {locationData.name}</h2>
                    <p>Local time: {locationData.localtime}</p>
                    {currentWeather && (
                        <div className="card">
                            <p>Last updated: {currentWeather.last_updated}</p>
                            <p>Temperature: {currentWeather.temp_c}°C</p>
                            <p>Condition: {currentWeather.condition.text}</p>
                            <img
                                src={currentWeather.condition.icon}
                                alt={currentWeather.condition.text}
                            />
                            <p>Wind speed: {currentWeather.wind_kph} km/h</p>
                            <p>Humidity: {currentWeather.humidity}%</p>
                            <p>Feels like: {currentWeather.feelslike_c}°C</p>
                            <p>UV index: {currentWeather.uv}</p>
                        </div>
                    )}
                </div>
            )}
        </div>)
}

export default Forecast;