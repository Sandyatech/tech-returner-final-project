import React, { useEffect, useState } from "react";
import "../../App.css";
import { Forecastday, CurrentWeatherData, Location, RootForecast } from "../../types/types_weather";
import WeatherCard from "./WeatherCard";
import CurrentWeather from "./CurrentWeather";
import LocationForm from "./LocationForm";
import { fetchData } from "../../services/httpsServices";
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";
import { addCurrentLocationToLocalStorage, getCurrentLocationFromLocalStorage } from "../../utils/storage";

const Forecast: React.FC = () => {
    const [forecast, setForecast] = useState<Array<Forecastday>>();
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
    const [locationData, setLocationData] = useState<Location>();

    const { currentLocation, setCurrentLocation } = useCurrentLocation();

    const handleSubmit = async (location: string) => {
        console.log("input location: ", location);
        setCurrentLocation(location);
        addCurrentLocationToLocalStorage(location);
    };

    useEffect(() => {
        const localStorage_currentLocation = getCurrentLocationFromLocalStorage();
        if (localStorage_currentLocation) {
            setCurrentLocation(localStorage_currentLocation);
        }
    }, []);

    useEffect(() => {
        if (currentLocation) {
            const getData = async () => {
                const params = {
                    q: currentLocation,
                    days: 3,
                };
                const response = (await fetchData({
                    responseType: "RootForecast",
                    params,
                })) as RootForecast;

                setForecast(response.forecast.forecastday);
                setCurrentWeather(response.current);
                setLocationData(response.location);
            };
            getData();
        }
    }, [currentLocation]);

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
};

export default Forecast;
