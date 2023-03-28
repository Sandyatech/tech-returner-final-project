import React from "react";
// import { hour } from "../../types/types_weather";
import { Forecastday, HourlyData } from "../../types/types_weather";
import "../../App.css";

interface WeatherCardProps {
    day: Forecastday;
    // day: {
    //     date: string;
    //     hour: Array<hour>;
    // };
}
const WeatherCard: React.FC<WeatherCardProps> = ({ day }) => {
    if (!day?.hour?.length) {
        return <p>No weather data available.</p>;
    }
    return (
        <div key={day.date} className="">
            <div key={day.date} className="">
                <div className="hourly">
                    {day.hour.map((hour: HourlyData) => (
                        <div key={hour.time} className="card">
                            <p>{hour.time}</p>
                            <p>{hour.temp_c}°C</p>
                            <p>{hour.condition.text}</p>
                            <img src={hour.condition.icon} alt={hour.condition.text} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
