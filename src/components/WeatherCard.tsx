import React from "react";
import { WeatherData } from "./types";
import "../App.css";

interface WeatherCardProps {
    day: WeatherData;

}


const WeatherCard: React.FC<WeatherCardProps> = ({ day }) => {
    return (
        <div key={day.date} className="">
            {/* <p>Date: {day.date}</p>
            <p>Max Temp: {day.day.maxtemp_c}</p>
            <p>Min Temp: {day.day.mintemp_c}</p>
            <p>Sunrise: {day.astro.sunrise}</p>
            <p>Sunset: {day.astro.sunset}</p>
            <p>Condition: {day.day.condition.text}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} /> */}

            <div className="hourly">
                {/* <h3>Hourly Weather:</h3> */}
                {day.hour.map((hour) => (
                    <div key={hour.time} className="card">
                        <p>Time: {hour.time}</p>
                        <p>Temp: {hour.temp_c}</p>
                        <p>Condition: {hour.condition.text}</p>
                        <img src={hour.condition.icon} alt={hour.condition.text} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;
