import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { WeatherData, CurrentWeatherData, LocationData } from "./types";
import WeatherCard from "./WeatherCard";
import CurrentWeather from "./CurrentWeather";
import LocationForm from "./LocationForm";

function Forecast() {
    const [forecast, setForecast] = useState<{ forecastday: WeatherData[] }>();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
    const [locationData, setLocationData] = useState<LocationData>();

    const handleSubmit = async (location: string) => {
        const options = {
            method: "GET",
            url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
            params: { q: location, days: "3" },
            headers: {
                'X-RapidAPI-Key': '3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            },
        };

        const { data } = await axios.request(options);
        setForecast(data.forecast);
        setCurrentWeather(data.current);
        setLocationData(data.location);
    };

    return (
        <div className="App">
            <LocationForm handleSubmit={handleSubmit} />
            {locationData && (
                <>
                    <h1>{locationData.name} Hourly Weather Forecast</h1>
                    <div className="forecast-container ">
                        <ul className="cards-list">
                            {forecast &&
                                forecast.forecastday.map((day) => (
                                    <li key={day.date} className="">
                                        <WeatherCard day={day} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <CurrentWeather
                        currentWeather={currentWeather}
                        locationName={locationData.name}
                        localTime={locationData.localtime}
                    />
                </>
            )}
        </div>
    );
}

export default Forecast;

