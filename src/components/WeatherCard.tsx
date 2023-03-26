import React from "react";
import { WeatherData } from "./types";
import "../App.css";

interface WeatherCardProps {
    day: WeatherData;

}

const WeatherCard: React.FC<WeatherCardProps> = ({ day }) => {
    return (
        <li key={day.date} className="card">
            <p>Date: {day.date}</p>
            <p>Max Temp: {day.day.maxtemp_c}</p>
            <p>Min Temp: {day.day.mintemp_c}</p>
            <p>Condition: {day.day.condition.text}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
        </li>
    );
};

export default WeatherCard;
