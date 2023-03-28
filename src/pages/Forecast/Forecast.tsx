import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { Forecastday, CurrentWeatherData, Location } from "../../types/types_weather";
import WeatherCard from "./WeatherCard";
import CurrentWeather from "./CurrentWeather";
import LocationForm from "./LocationForm";
import { FORECAST_URL, options } from "../../services/api";


function Forecast() {
    const [forecast, setForecast] = useState<Forecastday[]>();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
    const [locationData, setLocationData] = useState<Location>();

    const handleSubmit = async (location: string) => {
        const { data } = await axios.get(`${FORECAST_URL}?q=${location}&days=3`, options);
        setForecast(data.forecast.forecastday);
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
                                forecast.map((day) => (
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